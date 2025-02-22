import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const level = 32;

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.profile}>👤 Mon Profil</Text>
      <Text style={styles.level}>Niveau: {level}</Text>
    </View>
    <View style={styles.xpBar}><View style={{ ...styles.xpFill, width: `${(54 % 100)}%` }} /></View>
    <Text style={styles.sectionTitle}>Actualités Culturelles</Text>
    <Text>🎭 Découvrez les dernières tendances en culture !</Text>
    <Text style={styles.sectionTitle}>Recommandations</Text>
    <Text>📚 Lisez ce livre classique !</Text>
    <Button title="Quêtes journalières" onPress={() => navigation.navigate('Quêtes')} />
  </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  profile: { fontSize: 18, fontWeight: 'bold' },
  level: { fontSize: 18, fontWeight: 'bold' },
  xpBar: { height: 10, backgroundColor: '#ccc', marginTop: 10 },
  xpFill: { height: 10, backgroundColor: 'blue' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  podcastItem: { padding: 10, borderBottomWidth: 1 },
});