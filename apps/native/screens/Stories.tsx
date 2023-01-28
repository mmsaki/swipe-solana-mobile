import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { profiles } from "../data";

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

const Stories = () => {
  return (
    <View style={styles.layout}>
      <ScrollView horizontal style={styles.stories}>
        {profiles.map((profile: any) => {
          return (
            <Pressable>
              <StoryPost
                key={profile.publicKey}
                uri={profile.account.uri}
                userName={profile.account.userName}
              />
            </Pressable>
          );
        })}
      </ScrollView>
      <Text>ChatScreen</Text>
    </View>
  );
};

export default Stories;

const StoryPost = (props: any) => {
  return (
    <View style={{ marginRight: 8, marginTop: 5 }}>
      <Image style={styles.avatar} source={{ uri: props.uri }} />
      <Text style={styles.userName}>{props.userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    // backgroundColor: "#161517",
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
    marginTop: 40,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
