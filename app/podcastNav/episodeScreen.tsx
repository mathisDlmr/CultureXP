import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import AudioPlayer from '../../components/AudioPlayer';
import { CircleCheckBig } from 'lucide-react-native';

const EpisodesScreen = ({ route }) => {
  const [episodes, setEpisodes] = useState([]);
  const [xpValues, setXpValues] = useState({});
  const [validatedIndices, setValidatedIndices] = useState([]);
  const { rssUrl, podcastImage, podcastTitle } = route.params;
  const { playPodcast, isPlaying, isPaused } = useAudioPlayer();

  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  useEffect(() => {
    const fetchEpisodesFromAPI = async () => {
      try {
        const response = await axios.get(url);
        const fetchedEpisodes = response.data.items.map((item, index) => ({
          title: item.title,
          audioUrl: item.enclosure.link,
          image: item.thumbnail || '',
          description: item.description != '' ? item.description : item.content
        }));

        setEpisodes(fetchedEpisodes);

        // Calculer les valeurs d'XP et les indices validés
        const initialXpValues = {};
        const validated = [];
        fetchedEpisodes.forEach((_, index) => {
          initialXpValues[index] = 3 + Math.floor(Math.random() * 3);
          if (Math.random() < 0.25) {
            validated.push(index);
          }
        });

        setXpValues(initialXpValues);
        setValidatedIndices(validated);
      } catch (error) {
        console.error("Erreur lors de la récupération du flux RSS:", error);
      }
    };

    fetchEpisodesFromAPI();
  }, [rssUrl]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: podcastImage }} style={{ height: 192, aspectRatio: 1, borderRadius: 12, alignSelf: 'center', paddingVertical: 16 }} />
      <Text style={styles.sectionTitle}>{podcastTitle}</Text>
      <FlatList
        data={episodes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.podcastItem}
            onPress={() => playPodcast({
              title: item.title,
              audioUrl: item.audioUrl,
              image: podcastImage,
              description: item.description
            })}
          >
            <View style={styles.podcastDetails}>
              <Text style={styles.podcastTitle}>{item.title}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 6,
                borderRadius: 5,
                gap: 8
              }}
            >
              {validatedIndices.includes(index) ? (
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 5, gap: 8 }}>
                  <CircleCheckBig size={24} color={'#fff'} />
                  <View style={{ backgroundColor: '#AAD492', padding: 6, borderRadius: 12 }}>
                    <Text style={{ fontSize: 20, fontWeight: '800', color: '#fff' }}>{xpValues[index]}XP</Text>
                  </View>
                </View>
              ) : (
                <View style={{ backgroundColor: '#083A44', padding: 6, borderRadius: 12 }}>
                  <Text style={{ fontSize: 20, fontWeight: '800', color: '#fff' }}>{xpValues[index]}XP</Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuText}>⋮</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#252121' },
  sectionTitle: { fontSize: 26, fontWeight: '800', margin: 10, color: '#fff', alignSelf: 'center', marginBottom: 16 },
  podcastItem: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  podcastDetails: { flex: 1, marginLeft: 10 },
  podcastTitle: { fontSize: 16, fontWeight: '500', color: '#fff' },
  menuButton: { padding: 10 },
  menuText: { fontSize: 28, color: '#aaa' },
});

export default EpisodesScreen;
