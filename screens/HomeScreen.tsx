import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UserSVG from "../assets/SYBIL_FULL.svg";
import ChatSVG from "../assets/chat-icon.svg";
import ChatNotification from "../assets/chat-notification.svg";
import Swiper from "react-native-deck-swiper";
import { profiles, posts } from "../data";
import NopeIcon from "../assets/nope-icon.svg";
import LoveIcon from "../assets/love-icon.svg";
import { LinearGradient } from "expo-linear-gradient";
import BookmarkIcon from "../assets/bookmark-icon.svg";
import InfoIcon from "../assets/info-icon.svg";
import FavoriteIcon from "../assets/favorite-icon.svg";
import LeaderBoardIcon from "../assets/leaderboard-icon.svg";
import usePhantomConnection from "../hooks/WalletContextProvider";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { PROGRAM_ID } from "../constants";
import { User } from "../models/User";
import { getProvider, Program } from "@project-serum/anchor";
import { IDL, type Swipe } from "./swipe";

interface Profile {
  publicKey: string;
  account: {
    owner: string;
    userName: string;
    last_post: string;
    matches: string;
    uri: string;
  };
}

const HomeScreen = () => {
  const [username, setUsername] = useState("");
  const [uri, setUri] = useState("");
  const navigation = useNavigation();
  const { phantomWalletPublicKey, signMessage, signAndSendTransaction } =
    usePhantomConnection();
  const swipeRef = useRef(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleTransaction = async () => {
    if (!phantomWalletPublicKey) {
      alert("Please connect your Phantom wallet");
      return;
    }
    const user = new User(username, uri);
    const instructionDataBuffer = user.serialize();
    const transaction = new Transaction();
    const [pda, bump] = await PublicKey.findProgramAddress(
      [Buffer.from("user"), new PublicKey(phantomWalletPublicKey).toBuffer()],
      new PublicKey(PROGRAM_ID)
    );
    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: phantomWalletPublicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: instructionDataBuffer,
      programId: new PublicKey(PROGRAM_ID),
    });

    const provider = getProvider();

    const program = new Program(IDL, PROGRAM_ID, provider);

    const tx = await program.methods.createUser(username, uri).accounts({
      owner: new PublicKey(phantomWalletPublicKey),
      user: pda,
    }).instruction();

    // transaction.add(tx);

    const instruction2 = SystemProgram.transfer({
      fromPubkey: phantomWalletPublicKey,
      toPubkey: new PublicKey("B1GmJpBZeGrW144CcSkHxxHE4yoyXnudNhWoewVDyfnL"),
      lamports: 1000000,
    });

    transaction.add(instruction2);

    await signAndSendTransaction(transaction);
    console.log("Transaction sent", transaction);
  };

  useLayoutEffect(() => {}, []);

  const swipeLeft = async (cardIndex: any) => {
    if (!posts[cardIndex]) return;
    const userSwiped = posts[cardIndex].account.owner;
    console.log("You swiped left on " + userSwiped);
  };

  const swipeRight = async (cardIndex: any) => {
    if (!posts[cardIndex]) return;
    const userSwiped = posts[cardIndex].account.owner;
    console.log("You swiped right on " + userSwiped);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <LinearGradient
          colors={["#161517", "transparent"]}
          style={[styles.nftLinearGradient, { top: -120 }]}
        >
          <View style={{ height: 290, width: 530 }}></View>
        </LinearGradient>
        <TouchableOpacity onPress={() => navigation.navigate("Create Account")}>
          <View
            style={[
              styles.button,
              { borderRadius: 20, overflow: "hidden", width: 70, height: 70 },
            ]}
          >
            <UserSVG width={80} height={80} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.topNavButton}>
            <FavoriteIcon width={30} height={30} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LeaderBoard")}>
          <View style={styles.topNavButton}>
            <LeaderBoardIcon width={30} height={30} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.topNavButton}>
            <BookmarkIcon width={30} height={30} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <View style={styles.topNavButton}>
            <ChatSVG width={25} height={25} />
            <ChatNotification
              height={15}
              width={15}
              style={{ position: "absolute", right: 12, top: 12 }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Swiper
          ref={swipeRef}
          cards={posts.filter(
            (card) => card.account.owner !== phantomWalletPublicKey
          )}
          stackSize={10}
          cardIndex={0}
          disableBottomSwipe={true}
          backgroundColor={"transparent"}r
          stackScale={2}
          stackSeparation={10}
          childrenOnTop={true}
          infinite={false}
          onSwipedLeft={(cardIndex: any) => {
            console.log("PASS");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex: any) => {
            console.log("MATCH");
            swipeRight(cardIndex);
            handleTransaction();
          }}
          renderCard={(card: any) => {
            return (
              <View style={[styles.card, styles.cardShadow]}>
                <Image
                  source={{ uri: card.account.image }}
                  style={styles.image}
                />
                <LinearGradient
                  colors={["transparent", "#161517"]}
                  style={styles.nftLinearGradient}
                >
                  <View style={{ height: 100, width: 420 }}></View>
                </LinearGradient>
                <View style={styles.nftOwnerContainer}>
                  <Image
                    source={{ uri: card.account.image }}
                    style={styles.nftOwnerImage}
                  />
                  <Text numberOfLines={2} style={styles.title}>
                    {card.account.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.subTitle}>
                    Owned by : {card.account.owner}
                  </Text>
                </View>
              </View>
            );
          }}
        ></Swiper>
        <View style={styles.bottomNavigation}>
          <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()}>
            <View style={styles.button}>
              <NopeIcon width={50} height={50} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.button}>
              <BookmarkIcon width={40} height={40} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.button}>
              <InfoIcon width={40} height={40} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => swipeRef.current.swipeRight()}>
            <View style={styles.button}>
              <LoveIcon width={50} height={50} />
            </View>
          </TouchableOpacity>
        </View>
        <LinearGradient
          colors={["transparent", "#161517"]}
          style={styles.linearGradient}
        >
          <View style={{ height: 100, width: 425 }}></View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161517",
  },
  card: {
    flex: 1,
    alignSelf: "center",
    width: 425,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: 80,
    width: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  topNavButton: {
    backgroundColor: "rgba(0,0,0,0.1)",
    height: 65,
    width: 65,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 420,
    height: 600,
    resizeMode: "cover",
    borderRadius: 20,
    right: 0,
    backgroundColor: "gray",
  },
  nftOwnerImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 8,
    position: "absolute",
    bottom: 245,
    left: 0,
    marginLeft: 20,
    padding: 20,
  },
  nftOwnerContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 0,
    borderRadius: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    bottom: 250,
    left: 0,
    padding: 20,
    marginLeft: 60,
    width: 350,
  },
  subTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "normal",
    position: "absolute",
    bottom: 230,
    left: 0,
    padding: 20,
    marginLeft: 60,
    width: 300,
  },
  topNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    top: 50,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 50,
    paddingHorizontal: 24,
    top: 600,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 90,
    left: 40,
  },
  linearGradient: {
    position: "absolute",
    bottom: 0,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  nftLinearGradient: {
    position: "absolute",
    top: 500,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  noProfilesText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  noProfilesView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
  },
});
