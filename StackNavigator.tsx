import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import Chat from "./screens/Chat";
import LeaderBoardScreen from "./screens/LeaderBoardScreen";
import CreateAccount from "./screens/CreateAccount";
import MatchScreen from "./screens/MatchScreen";
import usePhantomConnection from "./hooks/WalletContextProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  const { session, phantomWalletPublicKey } =
    usePhantomConnection();

  return (
    <Stack.Navigator>
      {phantomWalletPublicKey ? (
        <>
          <Stack.Group>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Chat" component={Chat} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{ presentation: "modal", headerShown: false }}
          >
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{ presentation: "formSheet", headerShown: false }}
          >
            <Stack.Screen name="Create Account" component={CreateAccount} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="MatchScreen" component={MatchScreen} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}
