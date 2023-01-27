import { StyleSheet, Text, View, TouchableOpacity, GestureResponderEvent,} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import AuthProvider from "./hooks/useAuth";

export default function Native() {
  return (
    <NavigationContainer>
      <StackNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
