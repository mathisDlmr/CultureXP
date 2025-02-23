import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const imagesCarousel = [
  { url: 'https://www.unjourdeplusaparis.com/wp-content/uploads/2015/05/photo-louvre-insolite.jpg', title: 'Nouvelle exposition au Louvre', text: 'Nouvelle exposition au Louvre, entrée gratuite pour les -26 ans !' },
  { url: 'https://cdn-imgix.headout.com/media/images/c90f7eb7a5825e6f5e57a5a62d05399c-25058-BestofParis-EiffelTower-Cruise-Louvre-002.jpg', title: "La Tour Eiffel s'est refaite une beauté", text: "L'entrée pour les -18 ans sera gratuite jusqu'au 12/03 !" },
  { url: 'https://lvdneng.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2024/09/09/node_1500304/60613757/public/2024/09/09/25435602.jpeg?itok=dV6TZQta1737646284', title: "Lille 3000 c'est bientôt", text: 'Le Week-end prochain, Lille se transforme en un festival chinois géant !' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Louvre_Museum%2C_Paris_22_June_2014.jpg/1200px-Louvre_Museum%2C_Paris_22_June_2014.jpg', title: 'Nouvelle exposition au Louvre', text: 'Nouvelle exposition au Louvre, entrée gratuite pour les -26 ans !' },
];

const resumeCarousel = [
  { url: 'https://m.media-amazon.com/images/I/611kdlRqzKL._AC_UF1000,1000_QL80_.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61P-RG15UqL._AC_UF1000,1000_QL80_.jpg' },
  { url: 'https://cdn.cultura.com/cdn-cgi/image/width=830/media/pim/TITELIVE/19_9782290391174_1_75.jpg' },
  { url: 'https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253096337-001-T.jpeg' },
  {url : 'https://www.momox-shop.fr/build/_next/image?url=https%3A%2F%2Fimages2.medimops.eu%2Fproduct%2F459742%2FM02290349313-source.jpg&w=1080&q=75'}
];

const singleImage = {
  title: 'Festival du cinéma',
  text: 'Du 24/02 ou 27/02 : Toutes les places de cinéma à -50%',
};

const recommendedTitles = [
  { url: 'https://podmust.com/wp-content/uploads/hugo-decrypte-actus-du-jour-podcast.png' },
  { url: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/1e/53/36/1e5336c0-82ce-bcdc-2ba4-cf6cc6eae018/mza_3688779139242505348.jpg/1200x1200bf.webp' },
  { url: 'https://www.radiofrance.fr/s3/cruiser-production/2022/06/a7fc766f-3e49-45a0-a41f-5512d5c0f8c1/400x400_les-pieds-sur-terre.jpg'},
  { url: 'https://img.lemde.fr/2021/03/23/0/0/3000/3000/664/0/75/0/3e006b9_1616516956189-vignette-podcast-lheuredumonde-sansspotify.png'}
];

const HomeScreen = () => {
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (currentIndex + 1) % imagesCarousel.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.url }} style={styles.carouselImage} />
      <View style={styles.carouselTextContainer}>
        <View
          style={{
            justifyContent:'center',
            alignSelf: 'flex-start',
            alignItems:'center',
            flexDirection: 'row',
            padding:6,
            borderRadius:5,
            gap:8
          }}
        >
          <View style={{backgroundColor:'#083A44', padding: 6, borderRadius:12}}><Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>{12+Math.floor(Math.random()*9)}XP</Text></View>
        </View>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Animated.FlatList
        ref={flatListRef}
        data={imagesCarousel}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
          if (newIndex === imagesCarousel.length - 1) {
            flatListRef.current.scrollToIndex({ index: 0, animated: false });
          }
        }}
      />
      <View style={styles.carouselIndicatorContainer}>
        {imagesCarousel.map((_, i) => (
          <View
            key={i}
            style={[
              styles.carouselIndicator,
              { opacity: i === currentIndex ? 1 : 0.5 },
            ]}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Reprendre</Text>
      <FlatList
        horizontal
        data={resumeCarousel}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.url }} style={styles.resumeImage} />
            <View
              style={{
                position: 'absolute',
                top:3,
                right:3,
                justifyContent:'center',
                alignItems:'center',
                flexDirection: 'row',
                padding:6,
                borderRadius:5,
                gap:8
              }}
            >
              <View style={{backgroundColor:'#083A44', padding: 6, borderRadius:12}}><Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>{8+Math.floor(Math.random()*9)}XP</Text></View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.sectionTitle}>Bon Plan</Text>
      <View style={{padding:10}}>
        <Image source={require('../../assets/images/bonPlan.png')} style={styles.singleImage} resizeMode='contain'/>
        <View style={styles.singleImageTextContainer}>
          <Text style={styles.singleImageTitle}>{singleImage.title}</Text>
          <Text style={styles.singleImageText}>{singleImage.text}</Text>
        </View>
      </View> 
      <Text style={styles.sectionTitle}>Titres que vous pourriez aimer</Text>
      <FlatList
        horizontal
        data={recommendedTitles}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{navigation.navigate("achieveScreen")}}>
            <Image source={{ uri: item.url }} style={styles.recommendedImage}/>
            <View
              style={{
                position: 'absolute',
                top:3,
                right:3,
                justifyContent:'center',
                alignItems:'center',
                flexDirection: 'row',
                padding:6,
                borderRadius:5,
                gap:8
              }}
            >
              <View style={{backgroundColor:'#083A44', padding: 6, borderRadius:12}}><Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>2-3XP</Text></View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#252121'
  },
  carouselItem: {
    width: width,
    height: height * 0.6,
    marginBottom: 10
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  carouselTextContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 10
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  carouselText: {
    fontSize: 16,
    color: 'white',
  },
  carouselIndicatorContainer: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  carouselIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 3,
    shadowColor: 'white',
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    margin: 10,
    color:'#fff'
  },
  resumeImage: {
    width: width * 0.25,
    height: height * 0.15,
    margin: 5,
  },
  singleImage: {
    width: '100%',
    height: height * 0.25,
    borderRadius:10,
    alignSelf: 'center',
  },
  singleImageTextContainer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right:40
  },
  singleImageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  singleImageText: {
    fontSize: 16,
    color: 'white',
  },
  recommendedImage: {
    width: width * 0.25,
    height: height * 0.15,
    margin: 5,
  },
});

export default HomeScreen;
