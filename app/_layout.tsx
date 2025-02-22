import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home/homeScreen';
import PodcastScreen from '@/app/podcastNav/podcastScreen'
import Podcast2Screen from '@/app/podcastNav/podcastScreen2';
import Header from '@/components/Header';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="homeScreen" component={HomeScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function PodcastStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="podcastScreen" component={PodcastScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="podcast2Screen" component={Podcast2Screen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
  
export default function App() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Tab.Screen name="homeNav" component={HomeStackNavigator} />
      <Tab.Screen name="podcastNav" component={PodcastStackNavigator} />
    </Tab.Navigator>
  );
}
