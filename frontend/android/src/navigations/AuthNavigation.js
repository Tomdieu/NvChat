import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from '../screens/AuthScreens/WelcomeScreen'

const Stack = createStackNavigator()

const AuthNavigator = () =>{
    return (
        <Stack.Navigator screenOptions={{headerShown:true}}>
            <Stack.Screen name="welcome" component={WelcomeScreen} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}

export default AuthNavigator