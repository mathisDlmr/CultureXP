import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useAudioPlayer } from '../../context/AudioPlayerContext';
import AudioPlayer from '../../components/AudioPlayer';

const EpisodesScreen = ({ route }) => {
  const [episodes, setEpisodes] = useState([]);
  const { rssUrl, podcastImage, podcastTitle } = route.params;
  const { playPodcast, isPlaying, isPaused } = useAudioPlayer();

  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  useEffect(() => {
    const fetchEpisodesFromAPI = async () => {
      try {
        const response = await axios.get(url);
        setEpisodes(response.data.items.map(item => ({
          title: item.title,
          audioUrl: item.enclosure.link,
          image: item.thumbnail || '', 
        })));
      } catch (error) {
        console.error("Erreur lors de la récupération du flux RSS:", error);
      }
    };
  
    fetchEpisodesFromAPI();
  }, [rssUrl]);  

  return (
    <View style={styles.container}>
      <Image source={{uri:podcastImage}} style={{height:192, aspectRatio:1, borderRadius:12, alignSelf: 'center',paddingVertical: 16}}/>
      <Text style={styles.sectionTitle}>{podcastTitle}</Text>
      <FlatList
        data={episodes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.podcastItem} onPress={() => playPodcast(item.audioUrl)}>
            <View style={styles.podcastDetails}>
              <Text style={styles.podcastTitle}>{item.title}</Text>
            </View>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.menuText}>⋮</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      {(isPlaying || isPaused) && <AudioPlayer />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#252121' },
  sectionTitle: { fontSize: 26, fontWeight: '800', margin: 10, color: '#fff', alignSelf:'center', marginBottom:16 },
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
