import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Podcast, BookOpenText, MapPinHouse} from 'lucide-react-native';

// @ts-ignore
export default function CustomNavBar({ state, navigation }) {
  const activeColor = '#46739A';
  const unactiveColor = '#7F7D7D';

  const tabs = [
    { name: 'homeNav', label: 'Home', Icon: Home },
    { name: 'podcastNav', label: 'Podcasts', Icon: Podcast },
    { name: 'bookNav', label: 'Livres', Icon: BookOpenText },
    { name: 'mapNav', label: 'Plan', Icon: MapPinHouse },
  ];

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#252121',
      }}
    >
      <View
        style={{
          paddingVertical: 16,
          marginHorizontal: 15,
          backgroundColor: '#252121',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 24,
        }}
      >
        {tabs.map((tab, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: tab.name,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(tab.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: tab.name,
            });
          };

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <tab.Icon
                size={24}
                color={isFocused ? activeColor : unactiveColor}
              />
              <Text
                style={{
                  color: isFocused ? activeColor : unactiveColor,
                  fontSize: 14,
                  fontWeight: '500',
                  textAlign: 'center',
                  marginBottom: 2, 
                }}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
