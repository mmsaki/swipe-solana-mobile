import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Story from "./Stories";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { profiles } from "../data";

const ChatScreen = (props: any) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  });
  return (
    <View>
      <Story images={images} />
      <Text>ChatScreen</Text>
    </View>
  );
};

export default ChatScreen;

const images = [
  "https://images-ext-2.discordapp.net/external/S4VnatqXeS0QBb7odGHBmlVy9qVB3T2NtPthKEWSG_M/%3Fauto%3Dformat%26w%3D1400%26fr%3D1/https/i.seadn.io/gae/IHrlkHi2xGy9aHGTM-l0qPhkZtu4N-keVPD5zW1VLFu-R_MnITWDLL2a7KDccMozudQL0ils4nHKFpcf9m7GWsZ3MpWMmCZ4JMYwRWQ",
  "https://images-ext-1.discordapp.net/external/iP8GLw0aWdFhq_OUFX0_I7PLI2JUuTe4800ohb4C6wQ/%3Fauto%3Dformat%26w%3D1400%26fr%3D1/https/i.seadn.io/gae/igjc806dMSCUg9Jw8xnFSPgBPxD2gCBlixVqMVq7PcKcyN8612r5sGC4eYIAJjxcQYXqGHeUzYX0M7P-6aKYPgNneJwEnwsk8-Ce",
  "https://i.seadn.io/gae/ZVVSA4Jtfc3tXMo053Xfus4K0PGdvvN1ZrUV863YPpv8xAjkpOTgDulwuEhuqr3mLuxxvc63R46cQi6ZMj0rhwDrp-kEt9Xz-JHcxw?auto=format&w=1400&fr=1",
  "https://images-ext-2.discordapp.net/external/GlRX_CbdM-7w3rNyK3Ot04z-lWTDnIC4wrdZFK7Alns/%3Fauto%3Dformat%26w%3D1400%26fr%3D1/https/i.seadn.io/gae/ob74scPl5AxLISNZKxgXYQTZcnsxtgZVRoSFj-AT-p1rtZ_-byJho4OsIeeKD5Ir9sRs_gs_7r-CjTk20eTqzjQukmDf5LCsMaLA",
  "https://i.seadn.io/gae/GkIpZM2I-uXfc_7hO_8KrdnlFTysd4LVZhL1Gygu9nKHpjisxm0VLd6WaxqME1dy_iBTTgDKFwq58st3t60LdgA4anp4Rq4BKPsdu_w?auto=format&w=1400&fr=1",
  "https://images-ext-2.discordapp.net/external/fcwL-78hWWAXxvrbu7PvuNwCAa96DME3RN4S8xYbBKA/%3Fauto%3Dformat%26w%3D1400%26fr%3D1/https/i.seadn.io/gae/_89fP0a5Y_cyT4nkxHpak4BP7zKet26w1NGOXGuZ3ZLVuG7HJ5llq73f_N_86-TotEKU_g84YEzrQ-FmfMn7juLmdiokBCu8GeqdcQU",
];