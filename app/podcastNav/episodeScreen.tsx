import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useAudioPlayer } from "../../context/AudioPlayerContext";
import AudioPlayer from "../../components/AudioPlayer";
import { inspect } from "util";
import crypto from "crypto-js";

const EpisodesScreen = ({ route }) => {
  const [episodes, setEpisodes] = useState([]);
  const { guid } = route.params;
  const { playPodcast, isPlaying, isPaused } = useAudioPlayer();

  useEffect(() => {
    const fetchEpisodes = async () => {
      const apiKey = "JC9VAXBYVKVTUKXYEJEM";
      const apiSecret = "eVKPgnRZs6qB$QedUwEEvgaZaEw2xTyLHZ2UGgMk";
      const apiHeaderTime = Math.floor(Date.now() / 1000);
      const hash = crypto
        .SHA1(apiKey + apiSecret + apiHeaderTime)
        .toString(crypto.enc.Hex);

      const headers = {
        "User-Agent": "CulturXP/1.0",
        "X-Auth-Key": apiKey,
        "X-Auth-Date": apiHeaderTime.toString(),
        Authorization: hash,
      };

      try {
        const response = await axios.get(
          "https://api.podcastindex.org/api/1.0/episodes/bypodcastguid",
          {
            params: { guid },
            headers: headers,
          }
        );
        console.log(inspect(response.data, false, null, true));

        setEpisodes(response.data.items);
      } catch (error) {
        console.error("Erreur API Podcast Index:", error);
      }
    };

    fetchEpisodes();
  }, [guid]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Épisodes</Text>
      <FlatList
        data={episodes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.podcastItem}>
            <Text>{item.title}</Text>
            <Button title="Écouter" onPress={() => playPodcast(item)} />
          </View>
        )}
      />
      {(isPlaying || isPaused) && <AudioPlayer />}{" "}
      {/* Affichez le composant AudioPlayer si isPlaying ou isPaused est vrai */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  podcastItem: { padding: 10, borderBottomWidth: 1 },
});

export default EpisodesScreen;
