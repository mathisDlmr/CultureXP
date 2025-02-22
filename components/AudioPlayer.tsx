import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useAudioPlayer } from '../context/AudioPlayerContext';

const AudioPlayer = () => {
  const [sound, setSound] = React.useState(null);
  const { isPlaying, setIsPlaying } = useAudioPlayer();

  const playPodcast = async (url) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true }
    );

    setSound(newSound);
    setIsPlaying(true);
  };

  const stopPodcast = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const pausePodcast = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  if (!isPlaying) {
    return null;
  }

  return (
    <View style={styles.audioPlayer}>
      <Button title="Arrêter" onPress={stopPodcast} />
      <Button title="Pause" onPress={pausePodcast} />
    </View>
  );
};

const styles = StyleSheet.create({
  audioPlayer: { position: 'absolute', bottom: 90, width: '100%', padding: 10, backgroundColor: '#fff' },
});

export default AudioPlayer;
