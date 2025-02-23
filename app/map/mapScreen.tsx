import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Animated } from 'react-native';
import { Landmark, Library, Drama, SlidersHorizontal, Earth, List } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const filterAnim = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      fetchCulturalPlaces(loc.coords.latitude, loc.coords.longitude);
    };

    requestLocationPermission();
  }, []);

  const fetchCulturalPlaces = async (latitude, longitude) => {
    try {
      const overpassQuery = `
        [out:json][timeout:25];
        (
          node["tourism"="museum"](around:2500, ${latitude}, ${longitude});
          node["amenity"="theatre"](around:2500, ${latitude}, ${longitude});
          node["amenity"="library"](around:2500, ${latitude}, ${longitude});
        );
        out;
      `;

      const response = await axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`);

      const placesData = response.data.elements.map((element) => ({
        id: element.id,
        name: element.tags.name || "Lieu culturel",
        latitude: element.lat,
        longitude: element.lon,
        type: element.tags.amenity === "museum"
          ? "Musée gratuit -24 ans, ✨ 6XP"
          : element.tags.amenity === "library"
          ? "Librairie en libre accès, ✨ 3-22XP"
          : element.tags.amenity === "theatre"
          ? "Théâtre gratuit -18 ans, ✨ 6XP"
          : "Lieu Culturel, ✨ 5XP",
        oldType: element.tags.tourism || element.tags.amenity,
      }));

      setPlaces(placesData);
    } catch (error) {
      console.error('Erreur lors de la récupération des lieux culturels:', error);
    }
  };

  const filteredPlaces = places.filter((place) => {
    if (filter !== 'all' && place.oldType !== filter) {
      return false;
    }
    if (searchQuery && !place.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getMarkerIcon = (oldType) => {
    let icon;
    let backgroundColor;

    switch (oldType) {
      case 'museum':
        icon = <Landmark size={24} color="#FFFFFF" />;
        backgroundColor = '#4F88A6';
        break;
      case 'library':
        icon = <Library size={24} color="#FFFFFF" />;
        backgroundColor = '#BFDF94';
        break;
      case 'theatre':
        icon = <Drama size={24} color="#FFFFFF" />;
        backgroundColor = '#E64034';
        break;
      default:
        icon = <Earth size={24} color="#FFFFFF" />;
        backgroundColor = '#68AF47';
      }

    return (
      <View style={styles.pinContainer}>
        <View style={[styles.pinCircle, { backgroundColor }]}>
          {icon}
        </View>
        <View style={[styles.pinTriangle, { borderTopColor: backgroundColor }]} />
      </View>
    );
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
    Animated.timing(filterAnim, {
      toValue: isFilterVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const filterButtonsHeight = filterAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 169],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.listIconContainer} onPress={()=>navigation.navigate("listScreen")}><List size={32} color={'#fff'}/></TouchableOpacity>
      {location && (
        <MapView
          style={styles.map}
          customMapStyle={darkMapStyle}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              coordinate={{ latitude: place.latitude, longitude: place.longitude }}
              title={place.name}
              description={place.type}
            >
              {getMarkerIcon(place.oldType)}
            </Marker>
          ))}
        </MapView>
      )}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un lieu"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <TouchableOpacity style={styles.filterIconContainer} onPress={toggleFilterVisibility}>
        <SlidersHorizontal size={32} color="#FFFFFF" />;
      </TouchableOpacity>
      <Animated.View style={[styles.filterButtonsContainer, { height: filterButtonsHeight }]}>
        <TouchableOpacity onPress={() => setFilter('all')} style={styles.filterButton}>
          <Text style={styles.filterText}>Tous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('museum')} style={styles.filterButton}>
          <Text style={styles.filterText}>Musées</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('library')} style={styles.filterButton}>
          <Text style={styles.filterText}>Bibliothèques</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('theatre')} style={styles.filterButton}>
          <Text style={styles.filterText}>Théâtres</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  map: { width: '100%', height: '100%' },
  searchContainer: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 90,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 15,
    zIndex: 1, 
  },
  listIconContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 55,
    height: 55,
    backgroundColor: '#344E73',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, 
  },
  filterIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    width: 55,
    height: 55,
    backgroundColor: '#344E73',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  filterButtonsContainer: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    width: 160,
    backgroundColor: '#344E73',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1, 
  },
  filterButton: {
    width: '100%',
    padding: 10,
    height: 42.5,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  filterText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  pinContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  pinCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  pinTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
    bottom: -10,
  },
});

export default MapScreen;
