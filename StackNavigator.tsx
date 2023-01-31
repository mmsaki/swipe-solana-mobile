import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState, useMemo, useReducer } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Home from "./screens/Home";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import Chat from "./screens/Chat";
import useGlobalAuth from "./state/useGlobalState";
import ModalScreen from "./screens/ModalScreen";
import LeaderBoardScreen from "./screens/LeaderBoardScreen";
import CreateAccount from "./screens/CreateAccount";

const Stack = createNativeStackNavigator();

export default function App() {
  const { phantomWalletPublicKey } = useGlobalAuth();
  return (
    <Stack.Navigator>
      {/* <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}> */}
      {phantomWalletPublicKey ? (
        <>
          <Stack.Group>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Chat" component={Chat} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{ presentation: "modal", headerShown: false }}
          >
            <Stack.Screen name="Create Account" component={CreateAccount} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Modal" component={ModalScreen} />
            <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} />
          </Stack.Group>

          {/* <View style={[styles.row, styles.wallet]}>
                  <View style={styles.greenDot} />
                  <Text
                    style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {`Connected to: ${phantomWalletPublicKey.toString()}`}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Button title="Add Review" onPress={openAddReviewSheet} />
                  <Button title="Disconnect" onPress={disconnect} />
                </View> */}
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
        // <View style={{ marginTop: 15 }}>
        //   <Button title="Connect Phantom" onPress={connect} />
        // </View>
      )}
      {/* </View> */}
      {/* {submitting && (
            <ActivityIndicator
              color={COLORS.WHITE}
              size="large"
              style={styles.spinner}
            />
          )} */}
      {/* <MovieList connection={connection} />
          <AddReviewSheet
            actionSheetRef={actionSheetRef}
            phantomWalletPublicKey={phantomWalletPublicKey}
            signAndSendTransaction={signAndSendTransaction}
          />
          <Toast config={toastConfig} />
          <StatusBar style="auto" /> */}
      {/* </SafeAreaView> */}
      {/* </SafeAreaProvider> */}
    </Stack.Navigator>
  );
}
