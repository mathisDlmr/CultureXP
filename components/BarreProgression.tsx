import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface BarreProgressionProps {
    backgroundColor: string;
    progressColor: string;
    progress: number;
}

const BarreProgression: React.FC<BarreProgressionProps> = ({ backgroundColor, progressColor, progress }) => {
    return (
        <View style={[styles.progressBarBackground, { backgroundColor }]}>
            <View style={[styles.progressBarForeground, { width: `${progress * 100}%`, backgroundColor: progressColor }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    progressBarBackground: {
        height: 20,
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
    },
    progressBarForeground: {
        height: '100%',
        borderRadius: 10,
    },
});

export default BarreProgression;