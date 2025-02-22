import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';

const AudioPlayerContext = createContext();

export const useAudioPlayer = () => {
  return useContext(AudioPlayerContext);
};

export const AudioPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState({
    title: '',
    artist: '',
    image: '',
    description: '',
  });
  const [progress, setProgress] = useState(0);
  const soundRef = useRef(null);

  const playPodcast = async (url) => {
    if (soundRef.current) {
      soundRef.current.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync({ uri: url });
    soundRef.current = sound;
    sound.playAsync();
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pausePodcast = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPaused(true);
    }
  };

  const resumePodcast = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPaused(false);
    }
  };

  const stopPodcast = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      soundRef.current.unloadAsync();
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
    }
  };

  const seekBackward = async () => {
    if (soundRef.current) {
      const status = await soundRef.current.getStatusAsync();
      const newPosition = Math.max(status.positionMillis - 60000, 0);
      soundRef.current.setPositionAsync(newPosition);
    }
  };

  const seekForward = async () => {
    if (soundRef.current) {
      const status = await soundRef.current.getStatusAsync();
      const newPosition = Math.min(status.positionMillis + 60000, status.durationMillis);
      soundRef.current.setPositionAsync(newPosition);
    }
  };

  const togglePlayPause = async () => {
    if (isPaused) {
      await resumePodcast();
    } else {
      await pausePodcast();
    }
  };

  useEffect(() => {
    const updateProgress = async () => {
      if (soundRef.current) {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded) {
          setProgress(status.positionMillis / status.durationMillis);
        }
      }
    };

    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        isPaused,
        currentEpisode,
        progress,
        playPodcast,
        pausePodcast,
        resumePodcast,
        stopPodcast,
        seekBackward,
        seekForward,
        togglePlayPause,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
