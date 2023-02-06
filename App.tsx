import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { WalletContextProvider } from "./hooks/WalletContextProvider";

export default function Native() {
  return (
    <WalletContextProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </WalletContextProvider>
  );
}
