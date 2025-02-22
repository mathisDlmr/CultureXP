import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  const xp = 750;
  const maxXp = 1500;

  return (
    <View style={styles.header}>
      <Text style={styles.title}>CultureApp</Text>
      <View style={styles.xpBar}>
        <View style={[styles.xpFill, { width: `${(xp / maxXp) * 100}%` }]} />
      </View>
      <Text style={styles.xpText}>{xp} / {maxXp} XP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6a51ae',
    padding: 15,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  xpBar: {
    width: '80%',
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#ffcb42',
  },
  xpText: {
    color: '#fff',
    marginTop: 5,
  },
});

export default Header;
