import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import React, { createContext, useContext, useCallback, useEffect, useRef, useState, useReducer, useMemo } from "react";
import * as Linking from "expo-linking";
import { Buffer } from "buffer";
import ActionSheet from "react-native-actions-sheet";
import nacl from "tweetnacl";
import Toast from "react-native-toast-message";
import { decryptPayload } from "../utils/decryptPayload";
import bs58 from "bs58";
import { encryptPayload } from "../utils/encryptPayload";
import { buildUrl } from "../utils/buildUrl";
global.Buffer = global.Buffer || Buffer;
import * as SecureStore from "expo-secure-store";
import { View, Text } from "react-native";

const onConnectRedirectLink = Linking.createURL("onConnect");
const onDisconnectRedirectLink = Linking.createURL("onDisconnect");
const onSignAndSendTransactionRedirectLink = Linking.createURL(
  "onSignAndSendTransaction"
);


const connection = new Connection(clusterApiUrl("devnet"));

const GlobalContext = createContext({
  connection: Connection,
  program: undefined,
  userAccount: PublicKey,
  deeplink: "",
  dappKeyPair: undefined,
  sharedSecret: undefined,
  session: undefined,
  phantomWalletPublicKey: PublicKey,
  connect: () => {},
  disconnect: () => {}, 
  signAndSendTransaction: () => {},
  submitting: null,
  actionSheetRef: ActionSheet,
  openAddReviewSheet: () => { },
  loading: null,
});

export const GlobalProvider = ({ children }: any) => {
  const [isConnected, setIsConnected] = useState(false);
  const [program, setProgram] = useState();
  const [userAccount, setUserAccount] = useState();
  const [deeplink, setDeepLink] = useState<string>("");
  const [dappKeyPair] = useState(nacl.box.keyPair());

  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();
  const [session, setSession] = useState<string>();
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] =
    useState<PublicKey | null>(null);
  const [loading, setLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const actionSheetRef = useRef<ActionSheet>(null);

  // Initialize our app's deeplinking protocol on app start-up
  useEffect(() => {
    const initializeDeeplinks = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    };
    initializeDeeplinks();
    const listener = Linking.addEventListener("url", handleDeepLink);
    return () => {
      listener.remove();
    };
  }, []);

  const handleDeepLink = ({ url }: Linking.EventType) => setDeepLink(url);

  // Handle in-bound links
  useEffect(() => {
    setSubmitting(false);
    if (!deeplink) return;
    const url = new URL(deeplink);
    const params = url.searchParams;

    // Handle an error response from Phantom
    if (params.get("errorCode")) {
      const error = Object.fromEntries([...params]);
      const message =
        error?.errorMessage ??
        JSON.stringify(Object.fromEntries([...params]), null, 2);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
      });
      console.log("error: ", message);setLoading(false);
      return;
    }

    // Handle a `connect` response from Phantom
    if (/onConnect/.test(url.pathname)) {
      setLoading(true);
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get("phantom_encryption_public_key")!),
        dappKeyPair.secretKey
      );
      const connectData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecretDapp
      );
      setSharedSecret(sharedSecretDapp);
      setSession(connectData.session);
      setPhantomWalletPublicKey(new PublicKey(connectData.public_key));
      setIsConnected(true);
      console.log(`connected to ${connectData.public_key.toString()}`);
      setLoading(false);
    }

    // Handle a `disconnect` response from Phantom
    if (/onDisconnect/.test(url.pathname)) {
      setLoading(true);
      setPhantomWalletPublicKey(null);
      setIsConnected(false);
      console.log("disconnected");
      setLoading(false);
    }

    // Handle a `signAndSendTransaction` response from Phantom
    if (/onSignAndSendTransaction/.test(url.pathname)) {
      setLoading(true);
      actionSheetRef.current?.hide();
      const signAndSendTransactionData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );
      console.log("signAndSendTrasaction: ", signAndSendTransactionData);
      Toast.show({
        type: "success",
        text1: "Review submitted transaction ☺️",
        text2: signAndSendTransactionData.signature,
      });
      setLoading(false);
    }
  }, [deeplink]);

  // Initiate a new connection to Phantom
  const connect = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: "devnet",
      app_url: "https://solana-swipe-app.vercel.app/",
      redirect_link: onConnectRedirectLink,
    });
    const url = buildUrl("connect", params);
    Linking.openURL(url);
    setLoading(false);
  };

  // Initiate a disconnect from Phantom
  const disconnect = async () => {
    setLoading(true);
    const payload = {
      session,
    };
    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onDisconnectRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });
    const url = buildUrl("disconnect", params);
    Linking.openURL(url);
    setLoading(false);
  };

  // Initiate a new transaction via Phantom. We call this in `components/AddReviewSheet.tsx` to send our movie review to the Solana network
  const signAndSendTransaction = async (transaction: Transaction) => {
    if (!phantomWalletPublicKey) return;
    setSubmitting(true);
    setLoading(true);
    transaction.feePayer = phantomWalletPublicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
    });
    const payload = {
      session,
      transaction: bs58.encode(serializedTransaction),
    };
    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onSignAndSendTransactionRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });
    const url = buildUrl("signAndSendTransaction", params);
    Linking.openURL(url);
    setLoading(false);
  };

  // Open the 'Add a Review' sheet defined in `components/AddReviewSheet.tsx`
  const openAddReviewSheet = () => {
    actionSheetRef.current?.show();
  };

  const memo = useMemo(
    () => ({
      phantomWalletPublicKey,
      connect,
      disconnect,
      signAndSendTransaction,
      openAddReviewSheet,
      loading
    }),
    [phantomWalletPublicKey, isConnected]
  );

  return (
    <GlobalContext.Provider
      value={memo}
    >
      {children}
    </GlobalContext.Provider>
  );
};
  
export default function useGlobalAuth() { 
  return useContext(GlobalContext);
};