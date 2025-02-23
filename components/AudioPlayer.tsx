import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react-native';
import { X } from 'lucide-react-native'; // Assurez-vous d'importer une icône appropriée pour le bouton de fermeture

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
    togglePlayPause,
    maxProgress
  } = useAudioPlayer();

  const [expanded, setExpanded] = useState(false);

  if (!isPlaying && !isPaused) {
    return null;
  }

  return (
    <TouchableOpacity
      style={expanded ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#252121',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      } : {
        position: 'absolute',
        bottom: 90,
        left: 10,
        right: 10,
        width: '95%',
        padding: 10,
        backgroundColor: '#4F4F4F',
        borderRadius: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={1}
    >
      {expanded ? (
        <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%', paddingBottom: 20 }}>
          <TouchableOpacity onPress={stopPodcast} style={{ position: 'absolute', top: 10, right: 10 }}>
            <X size={32} color={'#fff'} />
          </TouchableOpacity>
          <Image source={{ uri: currentEpisode.image }} style={{ width: 325, height: 325, borderRadius: 10, marginTop:50 }} />
          <Text style={{ fontSize: 18, marginTop: 10, color: '#fff', fontWeight: '600', alignSelf:'flex-start' }}>{currentEpisode.title}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '60%', marginTop: 20 }}>
            <TouchableOpacity onPress={seekBackward}><SkipBack size={44} color={'#fff'}/></TouchableOpacity>
            <TouchableOpacity onPress={togglePlayPause} style={{backgroundColor:'#AAD492',borderRadius:100,padding:5}}>
              {isPaused ? <Play size={40} color={'#ddd'}/> : <Pause size={40} color={'#ddd'}/>}
            </TouchableOpacity>
            <TouchableOpacity onPress={seekForward} disabled={progress >= maxProgress}>
              <SkipForward size={44} color={progress >= maxProgress ? '#888' : '#fff'}/>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 18, marginTop: 10, fontWeight: '800', alignSelf:'flex-start', color:'#fff' }}>Description</Text>
          <Text style={{ fontSize: 16, marginTop: 5, alignSelf:'flex-start', color:'#fff' }}>{currentEpisode.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:'100%' }}>
            <Text style={{ fontSize: 18, marginTop: 20, fontWeight: '800', alignSelf:'flex-start', color:'#fff' }}>Avis(2)</Text>
            <Text style={{ fontSize: 18, marginTop: 20, fontWeight: '800', alignSelf:'flex-start', color:'#fff' }}>4,2☆</Text>
          </View>
          <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: '800', color:'#fff' }}>QuentinDu72</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color:'#fff', paddingTop:4 }}>, le 2 janvier 2024</Text>
            </View>
            <Text style={{ fontSize: 14, fontWeight: '400', color:'#fff' }}>J’ai trop aimé ces infos ! Bravo</Text>
          </View>
          <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginTop: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: '800', color:'#fff' }}>Emma2.0</Text>
              <Text style={{ fontSize: 12, fontWeight: '400', color:'#fff', paddingTop:4 }}>, le 5 janvier 2024</Text>
            </View>
            <Text style={{ fontSize: 14, fontWeight: '400', color:'#fff' }}>J’adore ce Podcast !</Text>
          </View>
        </ScrollView>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom:5 }}>
          <Image source={{ uri: currentEpisode.image }} style={{ width: 35, height: 35, borderRadius: 5 }} />
          <View style={{ flex: 1, marginLeft: 10, marginHorizontal: 10, maxWidth: '90%' }}>
            <Text style={{ fontSize: 16, color: '#fff' }}>{currentEpisode.title}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={togglePlayPause}>
              {isPaused ? <Play size={26} color={'#ddd'}/> : <Pause size={26} color={'#ddd'}/>}
            </TouchableOpacity>
            <TouchableOpacity onPress={stopPodcast} style={{ margin: 5 }}>
              <X size={26} color={'#ddd'} />
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', bottom: -10, left: 0, right: 0, height: 4, backgroundColor: '#ddd' }}>
            <View style={{ height: '100%', width: `${progress * 100}%`, backgroundColor: 'green' }} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AudioPlayer;
