import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack"

import SignInScreen from "../src/screens/singIn/index"
import SignUpScreen from "../src/screens/singUp/index"

const AppStack = createStackNavigator()

function AppNavigator() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
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
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
