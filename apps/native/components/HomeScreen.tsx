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
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { profiles, posts, matches } from "../data";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.layout}>
      <Stories images={images} />
      {/* <Button title="Go to Chat" /> */}
      <SwipeCard />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  card: {
    flex: 8,
    height: 500,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    backgroundColor: "red",
    width: 376,
    // position: "absolute",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 5,
  },
  stories: {
    flex: 1,
    width: 420,
  },
});

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

const images = [
  "https://images-ext-2.discordapp.net/external/S4VnatqXeS0QBb7odGHBmlVy9qVB3T2NtPthKEWSG_M/%3Fauto%3Dformat%26w%3D1400%26fr%3D1/https/i.seadn.io/gae/IHrlkHi2xGy9aHGTM-l0qPhkZtu4N-keVPD5zW1VLFu-R_MnITWDLL2a7KDccMozudQL0ils4nHKFpcf9m7GWsZ3MpWMmCZ4JMYwRWQ",
  "https://images-ext-1.discordapp.net/external/iP8GLw0aWdFhq_OUFX0_I7PLI2JUuTe4800ohb4C6wQ/%3Fauto%3Dformat%26w%3D1400%26fr%3D1/https/i.seadn.io/gae/igjc806dMSCUg9Jw8xnFSPgBPxD2gCBlixVqMVq7PcKcyN8612r5sGC4eYIAJjxcQYXqGHeUzYX0M7P-6aKYPgNneJwEnwsk8-Ce",
  "https://i.seadn.io/gae/ZVVSA4Jtfc3tXMo053Xfus4K0PGdvvN1ZrUV863YPpv8xAjkpOTgDulwuEhuqr3mLuxxvc63R46cQi6ZMj0rhwDrp-kEt9Xz-JHcxw?auto=format&w=1400&fr=1",
  "https://images-ext-2.discordapp.net/external/GlRX_CbdM-7w3rNyK3Ot04z-lWTDnIC4wrdZFK7Alns/%3Fauto%3Dformat%26w%3D1400%26fr%3D1/https/i.seadn.io/gae/ob74scPl5AxLISNZKxgXYQTZcnsxtgZVRoSFj-AT-p1rtZ_-byJho4OsIeeKD5Ir9sRs_gs_7r-CjTk20eTqzjQukmDf5LCsMaLA",
  "https://i.seadn.io/gae/GkIpZM2I-uXfc_7hO_8KrdnlFTysd4LVZhL1Gygu9nKHpjisxm0VLd6WaxqME1dy_iBTTgDKFwq58st3t60LdgA4anp4Rq4BKPsdu_w?auto=format&w=1400&fr=1",
  "https://images-ext-2.discordapp.net/external/fcwL-78hWWAXxvrbu7PvuNwCAa96DME3RN4S8xYbBKA/%3Fauto%3Dformat%26w%3D1400%26fr%3D1/https/i.seadn.io/gae/_89fP0a5Y_cyT4nkxHpak4BP7zKet26w1NGOXGuZ3ZLVuG7HJ5llq73f_N_86-TotEKU_g84YEzrQ-FmfMn7juLmdiokBCu8GeqdcQU",
];

function Stories(props: any) {
  const { images } = props;
  const navigation = useNavigation();
  return (
    <ScrollView horizontal style={styles.stories}>
      {images.map((image: string, index: any) => {
        return (
          <Pressable onPress={() => navigation.navigate("Chat")}>
            <Image key={index} style={styles.avatar} source={{ uri: image }} />
          </Pressable>
        );
      })}
    </ScrollView>
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
function Stories2(props: Array<Profile>) {
  const profiles = props;
  console.log(profiles);
  return (
    <ScrollView>

    </ScrollView>
  );
}

function SwipeCard(props: any) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={require("../assets/splash.png")} />
    </View>
  );
}
