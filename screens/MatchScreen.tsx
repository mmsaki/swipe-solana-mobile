import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const MatchScreen = () => {
  const navigations = useNavigation()
  const { params } = useRoute()
  const { user, userSwiped }  = params
  return (
    <View style={styles.container}>
      <Text>MatchScreen</Text>
    </View>
  )
}

export default MatchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161517",
    opacity: 0.89,
  },
});
