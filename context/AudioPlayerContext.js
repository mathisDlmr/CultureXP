import React, { createContext, useState, useContext } from 'react';
import { Audio } from 'expo-av';

const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <AudioPlayerContext.Provider value={{ isPlaying, playPodcast, stopPodcast, pausePodcast }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayerContext);
