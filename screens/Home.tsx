import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Button,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { profiles, posts, matches } from "../data";
import { useNavigation } from "@react-navigation/native";
import { PublicKey } from "@solana/web3.js";
import Swiper from "react-native-deck-swiper";
import LoveIcon from "../assets/love-icon.svg";
import NopeIcon from "../assets/nope-icon.svg";
import { useKeenSliderNative } from "keen-slider/react-native";
import useGlobalAuth from "../state/useGlobalState";
import UserImg from "../assets/user-profile.svg";
import ChatIcon from "../assets/chat-icon.svg";

const profilePage = "Profile";
const chatPage = "Chat";

const HomeScreen = (props: any) => {
  const navigation = useNavigation();
  const swipeRef = useRef(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  });

  const { disconnect, isConnected, phantomWalletPublicKey } = useGlobalAuth();
  console.log("isConnected", isConnected, phantomWalletPublicKey);

  return (
    <View style={styles.layout}>
      <Swiper
        ref={swipeRef}
        cards={posts}
        stackSize={10}
        cardIndex={0}
        verticalSwipe={false}
        onSwipedLeft={(cardIndex: any) => {
          console.log("PASS");
        }}
        onSwipedRight={(cardIndex: any) => {
          console.log("MATCH");
        }}
        overlayLabels={{
          left: {
            title: "NOPE",
            style: {
              label: {
                borderColor: "red",
                color: "red",
                borderWidth: 2,
                fontSize: 40,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginTop: 30,
                marginLeft: -30,
              },
            },
          },
          right: {
            title: "MATCH",
            style: {
              label: {
                borderColor: "green",
                color: "green",
                borderWidth: 3,
                fontSize: 40,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: 30,
                marginLeft: 30,
              },
            },
          },
        }}
        renderCard={(card: any) => {
          return (
            <SwipePost
              key={card.publicKey}
              title={card.account.title}
              image={card.account.image}
              owner={card.account.owner}
            />
          );
        }}
      />
      <View style={styles.topNavigation}>
        <TouchableOpacity>
          <UserImg
            width={50}
            height={50}
            style={styles.profileImage}
            onPress={() => navigation.navigate(profilePage)}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ChatIcon
            width={50}
            height={50}
            onPress={() => navigation.navigate(chatPage)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()}>
            <NopeIcon
              width={40}
              height={40}
              style={[styles.actionButton, { backgroundColor: "red" }]}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swipeRef.current.swipeRight()}>
          <LoveIcon width={40} height={40} style={styles.actionButton} />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;

function SwipePost(props: any) {
  return (
    <View>
      <Image style={styles.image} source={{ uri: props.image }} />
      <Text numberOfLines={2} style={[styles.header, styles.title]}>
        {props.title}
      </Text>
      <Text numberOfLines={1} style={styles.subTitle}>
        Owned by : {props.owner}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    // position: "absolute",
    backgroundColor: "#161517",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
    color: "white",
    position: "absolute",
    bottom: 0,
  },
  image: {
    width: 420,
    height: 650,
    borderRadius: 20,
    resizeMode: "cover",
    alignSelf: "center",
  },
  title: {
    position: "absolute",
    bottom: 45,
    left: 24,
    width: 350,
  },
  subTitle: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "normal",
    color: "#F8F9FD",
    bottom: 40,
    left: 24,
    width: 200,
  },
  actionButton: {
    justifyContent: "center",
    width: 90,
    height: 80,
    borderRadius: 20,
    position: "absolute",
    alignSelf: "center",
  },
  profileImage: {
    borderRadius: 20,
  },
  topNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 70,
    top: 630,
  },
});
