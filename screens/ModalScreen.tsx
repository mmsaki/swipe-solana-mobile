import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Logo from '../assets/logo.svg'
import useGlobalAuth from '../state/useGlobalState'

const ModalScreen = () => {
  const { phantomWalletPublicKey } = useGlobalAuth();
  const user = phantomWalletPublicKey.toString()
  console.log(phantomWalletPublicKey)
  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <Logo width={60} height={60} />
        <Text style={styles.headerText}>Swipe</Text>
      </View>
      <View>
        <Text style={styles.bodyText}>Welcome {user}</Text>
      </View>
    </View>
  );
}

export default ModalScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  topNav: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 18,
    fontWeight: 'normal',
  },
})