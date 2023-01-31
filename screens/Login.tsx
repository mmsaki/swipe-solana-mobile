import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Image,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import useGlobalAuth from "../state/useGlobalState";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/logo.svg";


const phantomLogo = require("../assets/logos/phantom-icon-purple.png")
const torusLogo = require("../assets/logos/torus-icon-white.png")

const LoginScreen = (props: any) => {
  const navigation = useNavigation();
  const { connect, loading } = useGlobalAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <View style={styles.layout}>
      <Logo style={styles.image} />
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
          onPress={connect}
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
          disabled={true}
        ></BlueButton>
        <View style={{ padding: 16 }}></View>
        <BlueButton bg="#393939" disabled={true} text="Solflare"></BlueButton>
        <Text
          style={[
            styles.useWalletText,
            { paddingTop: 16, textAlign: "center" },
          ]}
        >
          Or
        </Text>
        <BlueButton
          disabled={true}
          bg="#393939"
          text="Enter Ethereum Address"
        ></BlueButton>
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
  disabled?: boolean;
  onPress?: () => void;
}

export function BlueButton({
  text,
  onPress,
  bg,
  logo,
  width,
  height,
  logoLeft,
  logoTop,
  logoWidth,
  logoHeight,
  disabled,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bg, width: width, height: height },
      ]}
      onPress={onPress}
      disabled={disabled}
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
