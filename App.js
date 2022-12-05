//configurações iniciais q precisamos fazer
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Task from "./src/pages/Task";
import NewTask from "./src/pages/NewTask";
import Details from "./src/pages/Details";
import Login from './src/pages/Login';
import NewUser from './src/pages/NewUser';
import PomoTimer from './src/pages/PomoTimer';

import { LogBox } from 'react-native';


import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import React, { useState, useEffect } from "react";

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImages([
          require('./assets/logo.png'),
          require('./assets/background.png'),
          require('./assets/background_new_user.png'),
          require('./assets/background_add_edit.png'),
          require('./assets/background_pomodoro.png'),
          require('./assets/background_pomodoro_screen.png'),
          require('./assets/background_home_screen.png'),
        ]);


        await Promise.all([...imageAssets]);
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }
      loadResourcesAndDataAsync();
      LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.', 'Sending `onAnimatedValueUpdate` with no listeners registerd.']);
    }, []);

    if (!appIsReady) {
      return null;
    }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{headerShown: false,}}

        />
        <Stack.Screen
          name='NewUser'
          component={NewUser}
          options={{headerShown: false,}}

        />
        <Stack.Screen
          name='Tarefas'
          component={Task}
          options={{headerTintColor: "#FA5754", headerLeft: null, headerStyle: {backgroundColor: "#fff"} }} //headerStyle: {backgroundColor : "papayawhip"}}}

        />
        <Stack.Screen
          name='Nova Tarefa'
          component={NewTask}
          options={{headerTintColor: "#FA5754", headerStyle: {backgroundColor: "#fff"}}}

        />
        <Stack.Screen
          name='Detalhes'
          component={Details}
          options={{headerTintColor: "#FA5754", headerStyle: {backgroundColor: "#fff"}}}

        />
        <Stack.Screen
          name='Pomodoro'
          component={PomoTimer}
          options={{headerTintColor: "#FA5754", headerStyle: {backgroundColor: "#fff"}}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}