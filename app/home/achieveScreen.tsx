import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, Animated, ScrollView } from 'react-native';
import { CircleCheckBig } from 'lucide-react-native';

const recommendedTitles = [
  { url: 'https://podmust.com/wp-content/uploads/hugo-decrypte-actus-du-jour-podcast.png' },
  { url: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/1e/53/36/1e5336c0-82ce-bcdc-2ba4-cf6cc6eae018/mza_3688779139242505348.jpg/1200x1200bf.webp' },
  { url: 'https://www.radiofrance.fr/s3/cruiser-production/2022/06/a7fc766f-3e49-45a0-a41f-5512d5c0f8c1/400x400_les-pieds-sur-terre.jpg'},
  { url: 'https://img.lemde.fr/2021/03/23/0/0/3000/3000/664/0/75/0/3e006b9_1616516956189-vignette-podcast-lheuredumonde-sansspotify.png'}
];

const AchieveScreen = () => {
  return (
    <View
      style={{
        backgroundColor:'#252121',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection: 'column',
        height:'100%',
        width: '100%',
        gap:24
      }}
    >
      <Image source={{uri:'https://podmust.com/wp-content/uploads/hugo-decrypte-actus-du-jour-podcast.png'}} style={{height:192, aspectRatio:1, borderRadius:12}}/>
      <View
        style={{
          justifyContent:'center',
          alignItems:'flex-start',
          flexDirection: 'column',
          gap:16,
          padding:8
        }}
      >




        <View
          style={{
            width: '95%',
            backgroundColor: '#8EC395',
            borderRadius:15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding:8,
          }}
        >
          <View
            style={{
              justifyContent:'center',
              alignItems:'flex-start',
              flexDirection: 'column',
              gap:4,
              marginLeft:4,
            }}
          >
            <Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>Actualités du 18 février</Text>
            <Text style={{fontSize:16, fontWeight:'400',color:'#fff'}}>18 février - 12 min</Text>
          </View>
          <View
            style={{
              justifyContent:'center',
              alignItems:'center',
              flexDirection: 'row',
              padding:6,
              borderRadius:5,
              gap:8
            }}
          >
            <CircleCheckBig size={24} color={'#fff'}/>
            <View style={{backgroundColor:'#AAD492', padding: 6, borderRadius:12}}><Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>2XP</Text></View>
          </View>
        </View>






        <View
          style={{
            width: '95%',
            backgroundColor: '#8EC395',
            borderRadius:15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding:8,
          }}
        >
          <View
            style={{
              justifyContent:'center',
              alignItems:'flex-start',
              flexDirection: 'column',
              gap:4,
              marginLeft:4,
            }}
          >
            <Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>Actualités du 19 février</Text>
            <Text style={{fontSize:16, fontWeight:'400',color:'#fff'}}>19 février - 17 min</Text>
          </View>
          <View
            style={{
              justifyContent:'center',
              alignItems:'center',
              flexDirection: 'row',
              padding:6,
              borderRadius:5,
              gap:8
            }}
          >
            <CircleCheckBig size={24} color={'#fff'}/>
            <View style={{backgroundColor:'#AAD492', padding: 6, borderRadius:12}}><Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>2XP</Text></View>
          </View>
        </View>






        <View
          style={{
            width: '95%',
            backgroundColor: '#4F88A6',
            borderRadius:15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding:8,
          }}
        >
          <View
            style={{
              justifyContent:'center',
              alignItems:'flex-start',
              flexDirection: 'column',
              gap:4,
              marginLeft:4,
            }}
          >
            <Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>Actualités du 20 février</Text>
            <Text style={{fontSize:16, fontWeight:'400',color:'#fff'}}>20 février - 23 min</Text>
          </View>
          <View
            style={{
              justifyContent:'center',
              alignItems:'center',
              flexDirection: 'row',
              padding:6,
              borderRadius:5,
              gap:8
            }}
          >
            <View style={{backgroundColor:'#083A44', padding: 6, borderRadius:12}}><Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>3XP</Text></View>
          </View>
        </View>




        <View
          style={{
            width: '95%',
            backgroundColor: '#4F88A6',
            borderRadius:15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding:8,
          }}
        >
          <View
            style={{
              justifyContent:'center',
              alignItems:'flex-start',
              flexDirection: 'column',
              gap:4,
              marginLeft:4,
            }}
          >
            <Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>Actualités du 21 février</Text>
            <Text style={{fontSize:16, fontWeight:'400',color:'#fff'}}>21 février - 14 min</Text>
          </View>
          <View
            style={{
              justifyContent:'center',
              alignItems:'center',
              flexDirection: 'row',
              padding:6,
              borderRadius:5,
              gap:8
            }}
          >
            <View style={{backgroundColor:'#083A44', padding: 6, borderRadius:12}}><Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>2XP</Text></View>
          </View>
        </View>



        <View
          style={{
            width: '95%',
            backgroundColor: '#4F88A6',
            borderRadius:15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding:8,
          }}
        >
          <View
            style={{
              justifyContent:'center',
              alignItems:'flex-start',
              flexDirection: 'column',
              gap:4,
              marginLeft:4,
            }}
          >
            <Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>Actualités du 22 février</Text>
            <Text style={{fontSize:16, fontWeight:'400',color:'#fff'}}>22 février - 18 min</Text>
          </View>
          <View
            style={{
              justifyContent:'center',
              alignItems:'center',
              flexDirection: 'row',
              padding:6,
              borderRadius:5,
              gap:8
            }}
          >
            <View style={{backgroundColor:'#083A44', padding: 6, borderRadius:12}}><Text style={{fontSize:20, fontWeight:'800',color:'#fff'}}>2XP</Text></View>
          </View>
        </View>




      </View>
    </View>






/*
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
          <Image source={{ uri: item.url }} style={styles.resumeImage} />
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
          <Image source={{ uri: item.url }} style={styles.recommendedImage} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
*/
  );
};
export default AchieveScreen;
