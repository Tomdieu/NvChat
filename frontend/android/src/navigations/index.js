import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigation'


const index = () => {
  return (
    <NavigationContainer>
        <AuthNavigator />
    </NavigationContainer>
  )
}

export default index