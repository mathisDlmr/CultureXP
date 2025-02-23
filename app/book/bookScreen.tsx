import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import {
  Dumbbell as SportIcon,
  History as HistoryIcon,
  Beaker as ScienceIcon,
  BookOpen as PhilosophyIcon,
  Landmark as PoliticsIcon,
  Palette as ArtIcon,
  Filter
} from 'lucide-react-native';

const BookScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showOverlay, setShowOverlay] = useState(true);
  const [iconColors, setIconColors] = useState({});

  const searchBooks = async (subjects) => {
    try {
      const requests = subjects.map((subject) =>
        axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: { q: subject },
        })
      );

      const responses = await Promise.all(requests);
      const mergedBooks = responses.flatMap((response) => response.data.items);

      setBooks(mergedBooks);
    } catch (error) {
      console.error('Erreur API Google Books:', error);
    }
  };

  const interests = [
    { id: 1, name: 'Sport', icon: SportIcon },
    { id: 2, name: 'Histoire', icon: HistoryIcon },
    { id: 3, name: 'Sciences', icon: ScienceIcon },
    { id: 4, name: 'Philosophie', icon: PhilosophyIcon },
    { id: 5, name: 'Politique', icon: PoliticsIcon },
    { id: 6, name: 'Art', icon: ArtIcon },
  ];

  const handleInterestPress = (interestId) => {
    setSelectedInterests((prevSelected) => {
      if (prevSelected.includes(interestId)) {
        return prevSelected.filter((id) => id !== interestId);
      } else {
        return [...prevSelected, interestId];
      }
    });

    setIconColors((prevColors) => ({
      ...prevColors,
      [interestId]: !prevColors[interestId],
    }));
  };

  const handleValidatePress = () => {
    if (selectedInterests.length > 0) {
      const selectedNames = selectedInterests.map((id) =>
        interests.find((interest) => interest.id === id).name
      );
      searchBooks(selectedNames);
      setShowOverlay(false);
    }
  };

  const resetOverlay = () => {
    setSelectedInterests([]);
    setIconColors({});
    setShowOverlay(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Vous pourriez aimer</Text>
        <TouchableOpacity style={styles.subjectsButton} onPress={resetOverlay}>
          <Filter size={32} color={'#fff'}/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigation.navigate('bookDetailScreen', { book: item })}
          >
            <View style={styles.imageContainer}>
              <Text style={styles.placeholderText}>?</Text>
              <Image
                source={{ uri: item.volumeInfo.imageLinks?.thumbnail }}
                style={styles.bookImage}
              />
            </View>
            <View style={styles.bookDetails}>
              <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
              <Text style={styles.bookAuthor}>{item.volumeInfo.authors?.join(', ')}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 6,
                borderRadius: 5,
                gap: 8,
              }}
            >
              <View style={{ backgroundColor: '#083A44', padding: 6, borderRadius: 12 }}>
                <Text style={{ fontSize: 20, fontWeight: '800', color: '#fff' }}>
                  2-{3 + Math.floor(Math.random() * 3)}XP
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {showOverlay && (
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>Sélectionnez vos centres d'intérêt</Text>
          <View style={styles.interestsContainer}>
            {interests.map((interest) => {
              const IconComponent = interest.icon;
              return (
                <TouchableOpacity
                  key={interest.id}
                  style={[
                    styles.interestBox,
                    iconColors[interest.id] && styles.selectedInterestBox,
                  ]}
                  onPress={() => handleInterestPress(interest.id)}
                >
                  <IconComponent size={40} color={iconColors[interest.id] ? '#AAD492' : '#4F88A6'} />
                  <Text style={[styles.interestText, iconColors[interest.id] && styles.selectedInterestText]}>
                    {interest.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            style={[styles.validateButton, selectedInterests.length === 0 && styles.disabledButton]}
            onPress={handleValidatePress}
            disabled={selectedInterests.length === 0}
          >
            <Text style={styles.validateButtonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#252121' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  sectionTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  subjectsButton: { padding: 10 },
  subjectsButtonText: { fontSize: 18, color: '#ffffff', fontWeight: '600' },
  bookItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    position: 'relative',
    width: 48,
    height: 48,
  },
  placeholderText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 28,
    color: '#fff',
    zIndex: 1,
  },
  bookImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  bookDetails: { flex: 1, marginLeft: 10 },
  bookTitle: { fontSize: 20, fontWeight: '600', color: '#fff' },
  bookAuthor: { fontSize: 16, fontWeight: '400', color: '#aaa' },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#252121',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  overlayTitle: { color: '#fff', fontSize: 22, fontWeight: '800', textAlign: 'center' },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  interestBox: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderColor: '#4F88A6',
    borderWidth: 8,
    backgroundColor: 'transparent',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedInterestBox: {
    borderColor: '#AAD492',
  },
  interestText: {
    color: '#4F88A6',
    fontWeight: '800',
    fontSize: 20,
  },
  selectedInterestText: {
    color: '#AAD492',
  },
  validateButton: {
    width: '85%',
    backgroundColor: '#AAD492',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.4,
  },
  validateButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
});

export default BookScreen;
