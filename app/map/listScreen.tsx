import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import { MapPin, SlidersHorizontal } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const places = [
  {
    image: 'https://media.beauxarts.com/uploads/2024/12/unedsc_0086-copie-1300x975.jpg',
    title: 'Exposition au Grand Palais',
    subtitle: 'Peinture, Contemporain, Visite Guidée',
    schedule: 'Ouvert le Lundi à Vendredi',
    price: '€ Gratuit -26 ans',
    descriptionTitle: 'Description',
    description: 'Une exposition magnifique au Grand Palais...',
    moreInfoTitle: 'En savoir plus',
    moreInfo: 'Réservez vos billets en ligne...',
  },
  {
    image: 'https://lvdneng.rosselcdn.net/sites/default/files/dpistyles_v2/vdn_648w/2025/01/14/node_1543466/62432907/public/2025/01/14/32545951.jpeg?itok=oUz3aAG31736866765',
    title: 'Musée Camille Claudelle',
    subtitle: 'Sculpture, Historique, Visite Guidée',
    schedule: 'Ouvert tous les jours',
    price: '€ 10',
    descriptionTitle: 'Description',
    description: 'Un musée dédié à la sculpture...',
    moreInfoTitle: 'En savoir plus',
    moreInfo: 'Découvrez les œuvres de Camille Claudelle...',
  },
  {
    image: 'https://www.touraineloirevalley.com/wp-content/uploads/2023/06/chateau-amboise-14-juillet-tom_bess.jpg',
    title: 'Feu d\'artifice au Château de Pierrefonds',
    subtitle: 'Événement, Historique, Spectacle',
    schedule: 'Le 14 juillet',
    price: 'Gratuit',
    descriptionTitle: 'Description',
    description: 'Un spectacle pyrotechnique magnifique...',
    moreInfoTitle: 'En savoir plus',
    moreInfo: 'Venez admirer le feu d\'artifice...',
  },
  {
    image: 'https://danseclassique.info/wp-content/uploads/2022/06/ballet-lac-des-cygnes-ensemble.jpg',
    title: 'Le Lac des Cygnes',
    subtitle: 'Ballet, Classique, Spectacle',
    schedule: 'Représentations tous les soirs',
    price: '€ 20-50',
    descriptionTitle: 'Description',
    description: 'Un ballet classique intemporel...',
    moreInfoTitle: 'En savoir plus',
    moreInfo: 'Réservez vos places pour le Lac des Cygnes...',
  },
  {
    image: 'https://media.timeout.com/images/105649049/image.jpg',
    title: 'Nouvelle Librairie à Paris',
    subtitle: 'Littérature, Moderne, Café',
    schedule: 'Ouvert tous les jours',
    price: 'Entrée libre',
    descriptionTitle: 'Description',
    description: 'Une librairie moderne avec un café...',
    moreInfoTitle: 'En savoir plus',
    moreInfo: 'Découvrez les nouveautés littéraires...',
  },
];

const ListScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    const isExpanded = index === expandedIndex;

    return (
      <View style={styles.itemContainer}>
        <View>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View
            style={{
              position: 'absolute',
              bottom:10,
              left:8,
              justifyContent:'center',
              alignItems:'center',
              flexDirection: 'row',
              padding:6,
              borderRadius:5,
              gap:8
            }}
          >
            <View style={{backgroundColor:'#083A44', padding: 6, borderRadius:12}}><Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>{6+Math.floor(Math.random()*9)}XP</Text></View>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.scheduleContainer}>
            <View style={[styles.statusDot, { backgroundColor: 'green' }]} />
            <Text style={styles.scheduleText}>{item.schedule}</Text>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
          <View style={styles.keywordsContainer}>
            {item.subtitle.split(', ').map((keyword, idx) => (
              <View key={idx} style={styles.keyword}>
                <Text style={styles.keywordText}>{keyword}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={() => setExpandedIndex(isExpanded ? null : index)} style={styles.moreInfoButton}>
            <Text style={styles.moreInfoButtonText}>{isExpanded ? 'Masquer' : 'En savoir plus'}</Text>
          </TouchableOpacity>
          {isExpanded && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>{item.descriptionTitle}</Text>
              <Text style={styles.descriptionText}>{item.description}</Text>
              <Text style={styles.moreInfoTitle}>{item.moreInfoTitle}</Text>
              <Text style={styles.moreInfoText}>{item.moreInfo}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MapPin size={24} color="#fff" />
        </TouchableOpacity>
        <TextInput style={styles.searchInput} placeholder="Rechercher un lieu" placeholderTextColor="#fff" />
        <TouchableOpacity>
          <SlidersHorizontal size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#fff',
    marginHorizontal: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  scheduleText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 16,
  },
  priceText: {
    fontSize: 16,
    color: '#fff',
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keyword: {
    backgroundColor: 'rgba(8,58,68,0.5)',
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
    marginBottom: 8,
  },
  keywordText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  descriptionContainer: {
    marginTop: 10,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  moreInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  moreInfoText: {
    fontSize: 16,
    color: '#fff',
  },
  moreInfoButton: {
    backgroundColor: '#083A44',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  moreInfoButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ListScreen;
