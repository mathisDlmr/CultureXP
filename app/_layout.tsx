import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home/homeScreen';
import PodcastScreen from './podcastNav/podcastScreen';
import EpisodeScreen from './podcastNav/episodeScreen';
import Header from '../components/Header';
import CustomNavBar from '../components/CustomNavBar';
import AudioPlayer from '../components/AudioPlayer';
import MapScreen from './map/mapScreen';
import BookScreen from './book/bookScreen';
import QuestScreen from './quest/questScreen';
import { AudioPlayerProvider } from '../context/AudioPlayerContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function QuestStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="questScreen" component={QuestScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

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

function MapStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="mapScreen" component={MapScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AudioPlayerProvider>
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={{ header: () => <Header /> }}
          tabBar={(props) => <CustomNavBar {...props} />}
        >
          <Tab.Screen name="homeNav" component={HomeStackNavigator} />
          <Tab.Screen name="questNav" component={QuestStackNavigator} />
          <Tab.Screen name="podcastNav" component={PodcastStackNavigator} />
          <Tab.Screen name="bookNav" component={BookScreen} />
          <Tab.Screen name="mapNav" component={MapStackNavigator} />
        </Tab.Navigator>
        <AudioPlayer />
      </View>
    </AudioPlayerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
