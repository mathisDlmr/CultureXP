import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Podcast2Screen() {
  const nav = useNavigation();

  return (
    <View>
      <Text>Bienvenue sur l'écran des podcasts 2 !</Text>
      <TouchableOpacity onPress={nav.goBack}>lgwzefhkbjw</TouchableOpacity>
    </View>
  );
}
