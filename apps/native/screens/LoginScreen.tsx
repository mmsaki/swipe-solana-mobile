import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Image,
} from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol";

const phantomLogo = require("../assets/logos/phantom-icon-purple.png");
const torusLogo = require("../assets/logos/torus-icon-white.png");

const LoginScreen = () => {
  const { singInWithPantom } = useAuth();
  const user = "meek";
  console.log("user: ", user);
  return (
    <View style={styles.layout}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <Text style={styles.header}>Swipe</Text>
      {/* <Text>Connect your wallet to start swiping!</Text> */}
      <Text style={styles.entryText} numberOfLines={2}>
        Meet people in Web3 that have something common with you!
      </Text>
      <Text style={styles.useWalletText}>Use wallet to continue</Text>
      <View style={styles.buttonGrid}>
        <BlueButton
          logoWidth={24}
          logoHeight={24}
          logoTop={-3}
          logoLeft={20}
          logo={phantomLogo}
          width={380}
          bg="#0F62FF"
          text="Sign in with Phantom Wallet"
          onPress={() => {
            transact(async (mobileWallet) => {
              const authorization = await mobileWallet.authorize({
                cluster: "devnet",
                identity: { name: "My Expo App" },
              });
              console.log(authorization);
            });
          }}
        ></BlueButton>
        <View style={{ padding: 16 }}></View>
        <BlueButton
          logoWidth={21}
          logoHeight={21}
          logoTop={-3}
          logoLeft={110}
          width={380}
          height={50}
          logo={torusLogo}
          bg="#393939"
          text="Torus"
        ></BlueButton>
        <View style={{ padding: 16 }}></View>
        <BlueButton bg="#393939" text="Solflare"></BlueButton>
        <Text
          style={[
            styles.useWalletText,
            { paddingTop: 16, textAlign: "center" },
          ]}
        >
          Or
        </Text>
        <BlueButton bg="#393939" text="Enter Ethereum Address"></BlueButton>
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

export default LoginScreen;

export interface ButtonProps {
  bg: string;
  text: string;
  logo?: any;
  width?: number;
  height?: number;
  logoWidth?: number;
  logoHeight?: number;
  logoLeft?: number;
  logoTop?: number;
  onClick?: (event: GestureResponderEvent) => void;
  onPress?: () => void;
}

export function BlueButton({
  text,
  onClick,
  bg,
  logo,
  width,
  height,
  logoLeft,
  logoTop,
  logoWidth,
  logoHeight,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bg, width: width, height: height },
      ]}
      onPress={onClick}
    >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          style={[
            styles.walletLogo,
            {
              width: logoWidth,
              height: logoHeight,
              left: logoLeft,
              top: logoTop,
            },
          ]}
          source={logo}
        />
        <Text style={styles.Buttontext}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0F62FF",
    textAlign: "center",
    borderRadius: 12,
    paddingTop: 14,
    paddingBottom: 16,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: "15px",
    width: 335,
    height: 48,
  },
  buttonGrid: {
    flexDirection: "column",
  },
  buttons: {},
  Buttontext: {
    color: "#F8F9FD",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  layout: {
    flex: 1,
    backgroundColor: "#161517",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 136,
  },
  entryText: {
    fontSize: 23,
    fontWeight: "normal",
    color: "#C6C6C6",
    paddingHorizontal: 70,
  },
  header: {
    fontWeight: "bold",
    fontSize: 36,
    color: "#F8F9FD",
    paddingBottom: 12,
    paddingTop: 12,
  },
  useWalletText: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#6D7877",
    paddingBottom: 16,
    paddingTop: 80,
  },
  walletLogo: {
    marginRight: 12,
    position: "absolute",
    left: -5,
    top: -3,
  },
});
