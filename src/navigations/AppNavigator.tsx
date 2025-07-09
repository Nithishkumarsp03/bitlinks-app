import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Provider as PaperProvider } from 'react-native-paper';

import Login from '../screens/Login/Login';
import { Myconnections } from '../screens/myconnections/HomeScreen';
import Networks from '../screens/networks/Networks';
import Spoc from '../screens/spoc/Spoc';
import Project from '../screens/projects/Project';
import Addconnection from '../screens/addconnection/Addconnection';
import Minutes from '../screens/minutes/Minutes';
import Infograph from '../screens/infograph/Infograph';
import Interlinks from '../screens/interlinks/Interlinks';
import Profile from '../screens/profile/Profile';
import Mom from '../screens/person-projects/Mom';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await EncryptedStorage.getItem('authToken');
        const role = await EncryptedStorage.getItem('role');

        if (token && role) {
          setInitialRoute('Myconnections');
        } else {
          setInitialRoute('login');
        }
      } catch (error) {
        console.error('Error fetching auth token:', error);
        setInitialRoute('login'); // Fallback to login if an error occurs
      }
    };

    checkAuthStatus();
  }, []);

  if (initialRoute === null) {
    // Show a loading screen while checking authentication
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2867b2" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={Login} />
          {/* <Stack.Screen name="Maintabs" component={MainTabs} /> */}
          <Stack.Screen name="Myconnections" component={Myconnections} />
          <Stack.Screen name="Networks" component={Networks} />
          <Stack.Screen name="Project" component={Project} />
          <Stack.Screen name="Spoc" component={Spoc} />
          <Stack.Screen name="Addconnection" component={Addconnection} />
          <Stack.Screen name="Minutes" component={Minutes} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Infograph" component={Infograph} />
          <Stack.Screen name="Interlinks" component={Interlinks} />
          <Stack.Screen name="Mom" component={Mom} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppNavigator;
