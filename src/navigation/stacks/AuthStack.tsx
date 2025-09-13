import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '@types';
import LoginScreen from '@screens/LoginScreen/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Routes.LoginScreen} component={LoginScreen} />
    </Stack.Navigator>
);

export default AuthStack;
