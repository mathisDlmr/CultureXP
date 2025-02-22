import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home/homeScreen';
import PodcastScreen from '@/app/podcastNav/podcastScreen';
import EpisodeScreen from '@/app/podcastNav/episodeScreen';
import Header from '@/components/Header';
import CustomNavBar from '@/components/CustomNavBar';
import AudioPlayer from '@/components/AudioPlayer';
import { AudioPlayerProvider } from '@/context/AudioPlayerContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="homeScreen" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function PodcastStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="podcastScreen" component={PodcastScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EpisodeScreen" component={EpisodeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AudioPlayerProvider>
      <Tab.Navigator
        screenOptions={{ header: () => <Header /> }}
        tabBar={(props) => <CustomNavBar {...props} />}
      >
        <Tab.Screen name="homeNav" component={HomeStackNavigator} />
        <Tab.Screen name="podcastNav" component={PodcastStackNavigator} />
      </Tab.Navigator>
      <AudioPlayer />
    </AudioPlayerProvider>
  );
}
