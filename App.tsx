import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { GlobalProvider } from "./state/useGlobalState";

export default function Native() {
  return (
    <NavigationContainer>
      <GlobalProvider>
        <StackNavigator />
      </GlobalProvider>
    </NavigationContainer>
  );
}
