import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useAudioPlayer } from '@/context/AudioPlayerContext';

const AudioPlayer = () => {
  const { isPlaying, isPaused, stopPodcast, pausePodcast, resumePodcast } = useAudioPlayer();

  // Afficher les boutons si le podcast est en cours de lecture ou en pause
  if (!isPlaying && !isPaused) {
    return null;
  }

  return (
    <View style={styles.audioPlayer}>
      <Button title="Arrêter" onPress={stopPodcast} />
      <Button
        title={isPaused ? "Reprendre" : "Pause"}
        onPress={isPaused ? resumePodcast : pausePodcast}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  audioPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default AudioPlayer;