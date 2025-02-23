import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%', paddingBottom: 20, backgroundColor: '#252121', padding:16 }}>
      <Image source={{ uri: book.volumeInfo.imageLinks?.thumbnail }} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{book.volumeInfo.title}</Text>
      <Text style={styles.bookAuthor}>{book.volumeInfo.authors?.join(', ')}</Text>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.descriptionText}>{book.volumeInfo.description}</Text>
      <View style={styles.reviewsHeader}>
        <Text style={styles.sectionTitle}>Avis (2)</Text>
        <Text style={styles.sectionTitle}>4,2☆</Text>
      </View>
      <View style={styles.review}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewerName}>QuentinDu72</Text>
          <Text style={styles.reviewDate}>, le 2 janvier 2024</Text>
        </View>
        <Text style={styles.reviewText}>J’ai trop aimé ces infos ! Bravo</Text>
      </View>
      <View style={styles.review}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewerName}>Emma2.0</Text>
          <Text style={styles.reviewDate}>, le 5 janvier 2024</Text>
        </View>
        <Text style={styles.reviewText}>J’adore ce livre !</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bookImage: { width: 325, height: 325, borderRadius: 10, marginTop: 20 },
  bookTitle: { fontSize: 24, marginTop: 10, color: '#fff', fontWeight: '600', alignSelf: 'center' },
  bookAuthor: { fontSize: 18, marginTop: 5, color: '#aaa', alignSelf: 'center' },
  progressBar: { width: '100%', height: 4, backgroundColor: '#ddd', marginVertical: 20 },
  progressBarFill: { height: '100%', width: '50%', backgroundColor: 'green' },
  controls: { flexDirection: 'row', justifyContent: 'space-around', width: '60%', marginTop: 20 },
  playButton: { backgroundColor: '#AAD492', borderRadius: 100, padding: 5 },
  sectionTitle: { fontSize: 18, marginTop: 20, fontWeight: '800', alignSelf: 'flex-start', color: '#fff' },
  descriptionText: { fontSize: 16, marginTop: 5, alignSelf: 'flex-start', color: '#fff' },
  reviewsHeader: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 },
  review: { flexDirection: 'column', alignSelf: 'flex-start', marginTop: 15 },
  reviewHeader: { flexDirection: 'row', alignSelf: 'flex-start' },
  reviewerName: { fontSize: 16, fontWeight: '800', color: '#fff' },
  reviewDate: { fontSize: 12, fontWeight: '400', color: '#fff', paddingTop: 4 },
  reviewText: { fontSize: 14, fontWeight: '400', color: '#fff' },
});

export default BookDetailScreen;
