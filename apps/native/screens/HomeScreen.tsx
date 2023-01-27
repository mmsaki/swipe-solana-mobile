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
    <SafeAreaView style={styles.layout}>
      <ScrollView horizontal style={styles.stories}>
        {profiles.map((profile: any) => {
          return (
            <Pressable onPress={() => navigation.navigate(chatPage)}>
              <StoryPost
                key={profile.publicKey}
                uri={profile.account.uri}
                userName={profile.account.userName}
              />
            </Pressable>
          );
        })}
      </ScrollView>
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
  );
};

export default HomeScreen;

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

const StoryPost = (props: any) => {
  return (
    <View style={{ marginRight: 8, marginTop: 5 }}>
        <Image style={styles.avatar} source={{ uri: props.uri }} />
        <Text style={styles.userName}>{props.userName}</Text>
    </View>
  );
};

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

function Footer() {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate(profilePage)}
      />
    </View>
  );
}


interface Profile {
  publicKey: string;
  account: {
    owner?: string;
    userName?: string;
    last_post?: string;
    matches?: string;
    uri?: string;
  };
}



const styles = StyleSheet.create({
  layout: {
    flex: 1,
    // backgroundColor: "#fff",
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
    height: 600,
  },
  card: {
  },
  image: {
    backgroundColor: "gray",
    height: 700,
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
});