import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import CreateUser from "../components/CreateUser";
import ActionSheet from "react-native-actions-sheet";
import { useNavigation } from "@react-navigation/native";
import useGlobalAuth from "../state/useGlobalState";
import UserSVG from "../assets/user-profile.svg";
import { User } from "../models/User";
import { PROGRAM_ID } from "../constants";

const profilePicture = require("../assets/favicon.png");

const CreateAccount = (props: any) => {
  const { signAndSendTransaction } = useGlobalAuth();
  const navigation = useNavigation()
  const [username, setUsername] = useState("")
  const [imageURL, setImageURL] = useState("")
  const inclompleteProfile = !username || !imageURL
  

  const createUserAccount = () => { 

  }

  return (
    <View style={styles.layout}>
      <Text style={styles.header}>Create Account</Text>
      <ProfilePicture image={profilePicture} />
      <Text style={styles.labelText}>Step 1: Enter Username</Text>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        style={styles.inputText}
        maxLength={15}
      />
      <Text style={styles.labelText}>Step 2: Enter Profile Image URL</Text>
      <TextInput
        placeholder="Enter your profile image URL"
        value={imageURL}
        onChangeText={setImageURL}
        style={styles.inputText}
      />
      <TouchableOpacity
        disabled={inclompleteProfile}
        style={[
          styles.button,
          inclompleteProfile ? { backgroundColor: "#4C4C4C" } : styles.button,
        ]}
        onPress={createUserAccount}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccount;

function ProfilePicture(props: any) {
  const { image } = props;
  return (
    <View>
      <Text style={[styles.labelText, { paddingLeft: -5 }]}>
        Profile Picture
      </Text>
      <View style={styles.profileGrid}>
        <UserSVG style={styles.image} />
        <Button
          bg="#393939"
          buttonWidth={283}
          buttonHeight={56}
          text="Choose NFT"
          fontSize={20}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileGrid: {
    flexDirection: "row",
  },
  layout: {
    flex: 1,
    backgroundColor: "#161517",
    paddingHorizontal: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 24,
  },
  labelText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#C6C6C6",
    paddingVertical: 20,
  },
  header: {
    fontWeight: "bold",
    fontSize: 36,
    color: "#F8F9FD",
    paddingTop: 20,
    alignSelf: "center",
  },
  inputText: {
    fontSize: 26,
    fontWeight: "normal",
    color: "#F8F9FD",
    borderWidth: 1,
    borderColor: "#4C4C4C",
    borderRadius: 8,
    width: 380,
    paddingHorizontal: 10,
    height: 49,
    paddingVertical: 5,
  },
  button: {
    backgroundColor: "#0F62FF",
    borderRadius: 8,
    width: 380,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 100,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F8F9FD",
  },
});
