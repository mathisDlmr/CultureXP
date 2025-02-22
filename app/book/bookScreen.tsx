import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';
import axios from 'axios';
import crypto from 'crypto-js';

const BookScreen = ({ navigation }) => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const searchPodcasts = async () => {
      const apiKey = 'JC9VAXBYVKVTUKXYEJEM';
      const apiSecret = 'eVKPgnRZs6qB$QedUwEEvgaZaEw2xTyLHZ2UGgMk';
      const apiHeaderTime = Math.floor(Date.now() / 1000);
      const hash = crypto.SHA1(apiKey + apiSecret + apiHeaderTime).toString(crypto.enc.Hex);

      const headers = {
        'User-Agent': 'CulturXP/1.0',
        'X-Auth-Key': apiKey,
        'X-Auth-Date': apiHeaderTime.toString(),
        'Authorization': hash,
      };

      try {
        const response = await axios.get('https://api.podcastindex.org/api/1.0/search/byterm', {
          params: { q: 'manga' },
          headers: headers,
        });

        setPodcasts(response.data.feeds);
      } catch (error) {
        console.error('Erreur API Podcast Index:', error);
      }
    };

    searchPodcasts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Livres</Text>
      <FlatList
        data={podcasts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.podcastItem}>
            {item.image && <Image source={{ uri: item.image }} style={styles.podcastImage} />}
            <Text>{item.title}</Text>
            <Button title="Voir épisodes" onPress={() => navigation.navigate('EpisodeScreen', { rssUrl: item.url })} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  podcastItem: { padding: 10, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' },
  podcastImage: { width: 50, height: 50, marginRight: 10 },
});

export default BookScreen;