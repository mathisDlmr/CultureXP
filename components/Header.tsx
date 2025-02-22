import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = () => {
  const xp = 750;
  const maxXp = 1500;

  return (
    <View style={styles.header}>
      <Image source={require('../assets/images/icon.png')} style={{height:60, width:60}}/>
      <View style={styles.xpBar}>
        <View style={[styles.xpFill, { width: `${(xp / maxXp) * 100}%` }]} />
        <Text style={{fontSize:18, color:"#fff", fontWeight:'700', position:'absolute',top:4,left:15}}>Level 10</Text>
      </View>
      <View style={{height:40, width:80, backgroundColor:'#4F88A6', borderRadius:10, justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:20, color:"#fff", fontWeight:'800'}}>{xp} XP</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#252121',
    justifyContent:'space-around',
    flexDirection: 'row',
    height:90,
    alignItems: 'center',
  },
  xpBar: {
    width: '50%',
    height: 35,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  xpFill: {
    height: '100%',
    borderRadius:25,
    backgroundColor: '#AAD492',
  },
  xpText: {
    color: '#000000',
    marginTop: 5,
  },
});

export default Header;
