// navigation/MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainLayout from '../components/layout/Mainlayout';
import { Myconnections } from '../screens/myconnections/HomeScreen';
import Networks from '../screens/networks/Networks';
import Spoc from '../screens/spoc/Spoc';
import Project from '../screens/projects/Project';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <MainLayout>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Myconnections" component={Myconnections} />
        <Tab.Screen name="Networks" component={Networks} />
        <Tab.Screen name="Spoc" component={Spoc} />
        <Tab.Screen name="Project" component={Project} />
      </Tab.Navigator>
    </MainLayout>
  );
};

export default MainTabs;
