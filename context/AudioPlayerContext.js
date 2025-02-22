import React, { createContext, useState, useContext } from 'react';
import { Audio } from 'expo-av';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // Nouvel état pour gérer la pause

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
    setIsPaused(false); // Réinitialiser l'état de pause
  };

  const stopPodcast = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setIsPaused(false); // Réinitialiser l'état de pause
    }
  };

  const pausePodcast = async () => {
    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
      setIsPaused(true); // Mettre à jour l'état de pause
    }
  };

  const resumePodcast = async () => {
    if (sound && isPaused) {
      await sound.playAsync();
      setIsPlaying(true);
      setIsPaused(false); // Réinitialiser l'état de pause
    }
  };

  return (
    <AudioPlayerContext.Provider value={{ isPlaying, isPaused, playPodcast, stopPodcast, pausePodcast, resumePodcast }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
