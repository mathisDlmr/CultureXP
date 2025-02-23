import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';

const gains = [
  { id: '1', title: '2 places au cinéma UGC', xpCost: 50, image: 'https://play-lh.googleusercontent.com/QtA4VShEcBV4c0qs0gmVEWwDtPPY2Vlj_SvY6zKhG-gSMPEjOaymlMNCGq4lTK_uANI' },
  { id: '2', title: '10€ carte cadeau FNAC', xpCost: 30, image: 'https://yt3.googleusercontent.com/ytc/AIdro_lwZl_6M4GbSy5mu0MYEr_UWcTsUua96jgnlmg_UxevpUk=s900-c-k-c0x00ffffff-no-rj' },
  { id: '3', title: '1 mois abonnement Spotify', xpCost: 40, image: 'https://m.media-amazon.com/images/I/51rttY7a+9L.png' },
  { id: '4', title: '1 mois abonnement Netflix', xpCost: 45, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZhYUrmk6vDmi1-Pj7oI-HzTpQDCi9-IFTA&s' },
  { id: '6', title: '1 mois abonnement Deezer', xpCost: 40, image: 'https://m.media-amazon.com/images/I/51lo-v-XHZL.png' },
  { id: '7', title: 'Carte cadeau Amazon 20€', xpCost: 60, image: 'https://www.digitalnolimit.blog/wp-content/uploads/2018/12/Amazon.png' },
  { id: '8', title: '1 mois abonnement Disney+', xpCost: 50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-E2r_tm_YY5E6dO9r0tewErDnKwFBSgP_eA&s' },
  { id: '9', title: 'Carte cadeau Decathlon 20€', xpCost: 60, image: 'https://dirigeants-entreprise.com/content/uploads/D%C3%A9cathlon.jpg' },
  { id: '10', title: '1 mois abonnement Apple Music', xpCost: 45, image: 'https://www.apple.com/newsroom/images/product/apple-music/apple_music-update_hero_08242021.jpg.news_app_ed.jpg' },
  { id: '14', title: '1 mois abonnement Kindle Unlimited', xpCost: 55, image: 'https://productivewriters.com/wp-content/uploads/2013/09/amazon-kindle-logo.jpeg' },
];

const ShopScreen = ({ navigation }) => {
  const userXP = 150; 

  const renderGainItem = ({ item }) => (
    <TouchableOpacity style={styles.gainItem} disabled={item.xpCost > userXP}>
      <Image source={{ uri: item.image }} style={styles.gainImage} />
      <View style={styles.gainDetails}>
        <Text style={styles.gainTitle}>{item.title}</Text>
        <Text style={styles.gainXP}>{item.xpCost} XP</Text>
      </View>
      <ShoppingCart size={32} color={item.xpCost > userXP ? '#888' : '#fff'} style={{marginRight:5}}/>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Gains à acheter</Text>
      <FlatList
        data={gains}
        keyExtractor={(item) => item.id}
        renderItem={renderGainItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#252121', padding: 10 },
  sectionTitle: { fontSize: 24, fontWeight: '800', margin: 10, color: '#fff' },
  gainItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4F4F4F',
    borderRadius: 10,
    marginBottom: 10,
  },
  gainImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  gainDetails: {
    flex: 1,
    marginLeft: 10,
  },
  gainTitle: { fontSize: 18, fontWeight: '600', color: '#fff' },
  gainXP: { fontSize: 16, fontWeight: '400', color: '#aaa' },
});

export default ShopScreen;
