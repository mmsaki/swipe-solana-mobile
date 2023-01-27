import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";


export interface ButtonProps {
  bg: string;
  text: string;
  logo?: any;
  buttonWidth?: number;
  buttonHeight?: number;
  logoWidth?: number;
  logoHeight?: number;
  logoLeft?: number;
  logoTop?: number;
  fontSize?: number;
  onClick?: (event: GestureResponderEvent) => void;
  onPress?: () => void;
}

export function BlueButton({
  text,
  onClick,
  bg,
  logo,
  buttonWidth,
  buttonHeight,
  logoLeft,
  logoTop,
  logoWidth,
  logoHeight,
  fontSize,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bg, width: buttonWidth, height: buttonHeight },
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
        <Text style={[styles.Buttontext, { fontSize: fontSize }]}>{text}</Text>
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
    width: 24,
    height: 24,
    marginRight: 12,
    position: "absolute",
    left: -5,
    top: -3,
  },
});

