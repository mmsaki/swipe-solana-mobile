import React, { useState } from "react";
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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { profiles, posts, matches } from "../data";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";

const profilePage = "Profile"
const chatPage = "Chat";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <NavHeader />
    <SafeAreaView style={styles.layout}>
      <ScrollView style={styles.cardContainder}>
        {posts.map((post: any) => {
          return (
            <SwipePost
              key={post.publicKey}
              title={post.account.title}
              image={post.account.image}
              owner={post.account.owner}
            />
          );
        })}
      </ScrollView>
      <Footer />
      <StatusBar style="auto" />
    </SafeAreaView>
    </>
  );
};

export default HomeScreen;

function NavHeader() {
  const navigation = useNavigation();
  return (
    <View style={styles.navHeader}>
      <Image
        source={{ uri: "https://img.icons8.com/ios/512/name--v1.png" }}
        style={{ height: 50, width: 50 }}
      />
    </View>
  );
}

function InputWithLabel(props: any) {
  const { label, placeholder, value, onChangeText } = props;
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

function SwipePost(props: any) {
  return (
    <View style={styles.card}>
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

function ActionButton(props: any) {
  return (
    <View style={styles.actionButton}>
      <Button title="" onPress={props.onPress} />
      <Pressable onPress={props.onPress}>
        <Image style={[styles.actionButtonImage, {height: props.height, width: props.width}]} source={props.image} />
      </Pressable>
    </View>
  );
}

function Footer() {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <Button
        title="Some is Down here"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    // backgroundColor: "#161517",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
    color: "white",
  },
  cardContainder: {
    height: 550,
  },
  card: {},
  image: {
    backgroundColor: "gray",
    height: 690,
    width: 420,
    borderRadius: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 5,
  },
  stories: {
    flex: 1,
    width: 420,
    height: 100,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  title: {
    position: "absolute",
    bottom: 45,
    left: 24,
    width: 200,
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
  footer: {
    flexDirection: "row",
    width: 420,
    height: 50,
  },
  footerButton: {},
  navHeader: {
    flexDirection: "row",
    marginTop: 0,
    paddingTop: 50,
    paddingBottom: 10,
    // backgroundColor: "#161517",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginLeft: 12,
    marginBottom: 10,
  },
  actionButton: {},
  actionButtonImage: {
    position: "absolute",
    width: 20,
    height: 20,
    left: 320,
    top: 10,
  },
});