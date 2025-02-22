import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import xml2js from 'react-native-xml2js';
import { useAudioPlayer } from '@/context/AudioPlayerContext';
import AudioPlayer from '@/components/AudioPlayer';

const EpisodesScreen = ({ route }) => {
  const [episodes, setEpisodes] = useState([]);
  const { rssUrl } = route.params;
  const { playPodcast, isPlaying, isPaused } = useAudioPlayer();

  useEffect(() => {
    const fetchEpisodesFromRSS = async () => {
      try {
        const response = await axios.get(rssUrl);
        xml2js.parseString(response.data, (err, result) => {
          if (err) {
            console.error('Erreur de parsing XML:', err);
            return;
          }

          const items = result.rss.channel[0].item || [];
          const parsedEpisodes = items.map((item) => ({
            title: item.title[0],
            audioUrl: item.enclosure ? item.enclosure[0].$.url : null,
          })).filter(ep => ep.audioUrl);

          setEpisodes(parsedEpisodes);
        });
      } catch (error) {
        console.error('Erreur lors de la récupération du flux RSS:', error);
      }
    };

    fetchEpisodesFromRSS();
  }, [rssUrl]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Épisodes</Text>
      <FlatList
        data={episodes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.podcastItem}>
            <Text>{item.title}</Text>
            <Button title="Écouter" onPress={() => playPodcast(item.audioUrl)} />
          </View>
        )}
      />
      {(isPlaying || isPaused) && <AudioPlayer />} {/* Affichez le composant AudioPlayer si isPlaying ou isPaused est vrai */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  podcastItem: { padding: 10, borderBottomWidth: 1 },
});

export default EpisodesScreen;
