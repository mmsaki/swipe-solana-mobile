import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { BlueButton } from "../components/Button";


const profilePicture = require("../assets/favicon.png");

const EditProfile = () => {
  return (
    <View style={styles.layout}>
      <Text style={[styles.header, { position: "relative", top: -50 }]}>
        Edit Profile
      </Text>
      <ProfilePicture image={profilePicture} />
      <InputWithLabel
        key="Username"
        label="Username"
        placeholder="Enter your name"
        fontSize={36}
      />
      <InputWithLabel
        key="Bio"
        label="Bio"
        placeholder=""
        numberOfLines={4}
        maxLength={40}
        multiline={true}
        height={100}
        fontSize={26}
      />
      <InputWithLabel
        key="Twitter"
        label="Twitter"
        placeholder="@zenits"
        fontSize={36}
      />
      <GenderSelect label="" />
      <BlueButton
        fontSize={20}
        text="Save"
        bg="#0F62FF"
        buttonWidth={380}
      ></BlueButton>
    </View>
  );
};

export default EditProfile;

function ProfilePicture(props: any) {
  const { image } = props;
  return (
    <View >
    <Text style={[styles.labelText, {paddingLeft: -5}]}>Profile Picture</Text>
    <View style={styles.profileGrid}>
      <Image style={styles.image} source={image} />
      <BlueButton
        bg="#393939"
        buttonWidth={283}
        buttonHeight={56}
          text="Choose NFT"
          fontSize={20}
      ></BlueButton>
      </View>
    </View>
  );
}

function InputWithLabel(props: any) {
  const {
    label,
    placeholder,
    value,
    onChangeText,
    onSubmitEditing,
    numberOfLines,
    maxLength,
    multiline,
    height,
    fontSize,
  } = props;
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        style={[styles.inputText, { height: height, fontSize: fontSize }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        multiline={multiline}
      />
    </View>
  );
}

function GenderSelect(props: any) {
  const { label, placeholder, value, onChangeText, onSubmitEditing } = props;
  return (
    <View style={[styles.inputContainer, {padding: 50}]}>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  profileGrid: {
    flexDirection: "row",
    marginBottom: 20,
  },
  layout: {
    flex: 1,
    backgroundColor: "#161517",
    justifyContent: "center",
    alignItems: "center",
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
    paddingBottom: 10,
    paddingLeft: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 36,
    color: "#F8F9FD",
    paddingBottom: 12,
    paddingTop: 12,
  },
  inputText: {
    fontSize: 36,
    fontWeight: "normal",
    color: "#F8F9FD",
    borderWidth: 1,
    borderColor: "#4C4C4C",
    borderRadius: 8,
    width: 380,
    paddingHorizontal: 10,
    height: 49,
    paddingVertical: 5,
    autoComplete: "name",
  },
  inputContainer: {
    padding: 10,
  },
});