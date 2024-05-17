import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack"

import SignInScreen from "../src/screens/singIn/index"
import SignUpScreen from "../src/screens/singUp/index"
import HomePage from "../src/screens/homePage/index"

const AppStack = createStackNavigator()

function AppNavigator() {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignInScreen}
        />
        <AppStack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUpScreen}
        />
        <AppStack.Screen
          options={{ headerShown: false }}
          name="HomePage"
          component={HomePage}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
