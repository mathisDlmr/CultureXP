import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PodcastScreen() {
  const nav = useNavigation();

  return (
    <View>
      <Text>Bienvenue sur l'écran des podcasts !</Text>
      <TouchableOpacity onPress={()=>nav.navigate("podcast2Screen")}>lgwzefhkbjw</TouchableOpacity>
    </View>
  );
}
