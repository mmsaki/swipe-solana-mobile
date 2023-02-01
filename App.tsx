import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { WalletContextProvider } from "./hooks/WalletContextProvider";
import { clusterApiUrl } from "@solana/web3.js";


const devnet = clusterApiUrl("devnet");

export default function Native() {
  return (
      <WalletContextProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </WalletContextProvider>
  );
}
