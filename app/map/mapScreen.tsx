import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Landmark, Library, Drama } from 'lucide-react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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
        ? "Musée gratuit -24 ans, ✨ 200XP" 
        : element.tags.amenity === "library"
        ? "Librairie en libre accès, ✨ 50XP" 
        : element.tags.amenity === "theatre"
        ? "Théatre gratuit -18 ans, ✨ 100XP" 
        : "Lieu Culturel, ✨ 50XP",
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
        backgroundColor = '#3585CD';
        break;
      case 'library':
        icon = <Library size={24} color="#FFFFFF" />;
        backgroundColor = '#33FF57';
        break;
      case 'theatre':
        icon = <Drama size={24} color="#FFFFFF" />;
        backgroundColor = '#FF5733';
        break;
      default:
        return null;
    }
  
    return (
      <View style={styles.pinContainer}>
        <View style={[styles.pinCircle, { backgroundColor }]}>
          {icon}
        </View>
        <View style={[styles.pinTriangle, { borderTopColor: backgroundColor }]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
      <View style={styles.filterContainer}>
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
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un lieu"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
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
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  filterContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  filterButton: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  filterText: {
    fontSize: 16,
  },
  searchContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  searchInput: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
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
