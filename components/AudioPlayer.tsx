import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAudioPlayer } from '../context/AudioPlayerContext';

const AudioPlayer = () => {
  const {
    isPlaying,
    isPaused,
    stopPodcast,
    pausePodcast,
    resumePodcast,
    currentEpisode,
    progress,
    seekBackward,
    seekForward,
    togglePlayPause
  } = useAudioPlayer();

  const [expanded, setExpanded] = useState(false);

  if (!isPlaying && !isPaused) {
    return null;
  }

  return (
    <TouchableOpacity
      style={expanded ? styles.expandedPlayer : styles.compactPlayer}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={1}
    >
      {expanded ? (
        <View style={styles.expandedContent}>
          <Image source={{ uri: currentEpisode.image }} style={styles.expandedImage} />
          <Text style={styles.expandedTitle}>{currentEpisode.title}</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.controls}>
            <Button title="⏮ 1 min" onPress={seekBackward} />
            <Button title={isPaused ? "▶️" : "⏸"} onPress={togglePlayPause} />
            <Button title="⏭ 1 min" onPress={seekForward} />
          </View>
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.descriptionText}>{currentEpisode.description}</Text>
        </View>
      ) : (
        <View style={styles.compactContent}>
          <Image source={{ uri: currentEpisode.image }} style={styles.compactImage} />
          <View style={styles.textContainer}>
            <Text style={styles.artistName}>{currentEpisode.artist}</Text>
            <Text style={styles.episodeTitle}>{currentEpisode.title}</Text>
          </View>
          <View style={styles.compactControls}>
            <Button title="■" onPress={stopPodcast} />
            <Button title={isPaused ? "▶️" : "⏸"} onPress={togglePlayPause} />
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  compactPlayer: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    right: 10,
    width: '95%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  compactImage: {
    width: 32,
    height: 32,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  artistName: {
    fontSize: 18,
  },
  episodeTitle: {
    fontSize: 14,
    color: '#555',
  },
  compactControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#ddd',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'green',
  },
  expandedPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedContent: {
    alignItems: 'center',
    width: '100%',
  },
  expandedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  expandedTitle: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 20,
  },
  descriptionLabel: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AudioPlayer;
