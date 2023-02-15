import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/Auth/AuthScreen";

import WelcomeScreen from '../screens/Auth/WelcomeScreen'

const Stack = createStackNavigator()

const AuthNavigator = () =>{
    return (
        <Stack.Navigator screenOptions={{headerShown:true}}>
            <Stack.Screen name="welcome" component={WelcomeScreen} options={{headerShown:false}} />
            <Stack.Screen name="Login" component={AuthScreen} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}

export default AuthNavigator