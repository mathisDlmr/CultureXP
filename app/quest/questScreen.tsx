import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Film, Ticket, Music, Palette } from 'lucide-react-native';
import BarreProgression from '../../components/BarreProgression';
import ClaimButton from '../../components/ClaimButton';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from "expo-router";

// Circular Progress Component
const CircularProgress = ({ progress, size, strokeWidth, color }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <Svg width={size} height={size}>
            <Circle
                stroke={color}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                r={radius}
                cx={size / 2}
                cy={size / 2}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </Svg>
    );
};

export default function QuestScreen() {
    const xp = 250;
    const maxXp = 400;
    const progress = xp / maxXp;
    const xpRemaining = maxXp - xp;

    const dailyQuestProgress1 = 0.0;
    const dailyQuestProgress2 = 0.5;
    const dailyQuestProgress3 = 1.0;

    const  navigation = useNavigation();

    const rewardsProgress = [0.9, 0.3, 0.8, 1.0]; 
    const rewardLinks = [
        "https://www.cinemasgaumontpathe.com/",
        "https://www.fnac.com/",
        "https://www.ticketmaster.fr/",
        "https://www.cultura.com/"
    ];

    const handleRewardPress = (index) => {
        if (rewardsProgress[index] === 1.0) {
            navigation.navigate("shopNav");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.topSpace}></View>
                <Text style={styles.headerText}>Votre Niveau</Text>
                <View style={styles.blueRectangle}>
                    <Text style={styles.xpText}>{xp} / {maxXp} xp</Text>
                    <BarreProgression backgroundColor="white" progressColor="#AAD492" progress={progress} />
                    <Text style={styles.remainingXpText}>{xpRemaining} xp restants pour compléter le niveau</Text>
                    <Text style={styles.levelText}>Niveau 10</Text>
                </View>
                <Text style={styles.headerText}>Quêtes Journalières</Text>
                <View style={styles.greenRectangle}>
                    <View style={{ width: '100%', marginTop: 20 }}>
                        <Text style={styles.questText}>Écouter 30 min de podcast - 2XP ({(dailyQuestProgress1 * 100).toFixed(0)}%)</Text>
                        <View style={styles.progressBarWithButton}>
                            <BarreProgression backgroundColor="white" progressColor="#4F88A6" progress={dailyQuestProgress1} />
                            <ClaimButton
                                isLocked={dailyQuestProgress1 !== 1.0}
                                onPress={() => {}}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%', marginTop: 20 }}>
                        <Text style={styles.questText}>Lire 25 pages d'un livre  - 2XP({(dailyQuestProgress2 * 100).toFixed(0)}%)</Text>
                        <View style={styles.progressBarWithButton}>
                            <BarreProgression backgroundColor="white" progressColor="#4F88A6" progress={dailyQuestProgress2} />
                            <ClaimButton
                                isLocked={dailyQuestProgress2 !== 1.0}
                                onPress={() => {}}
                            />
                        </View>
                    </View>
                    <View style={{ width: '70%', marginTop: 20 }}>
                        <Text style={styles.questText}>Laisser un avis - 1XP ({(dailyQuestProgress3 * 100).toFixed(0)}%)</Text>
                        <View style={styles.progressBarWithButton}>
                            <BarreProgression backgroundColor="white" progressColor="#4F88A6" progress={dailyQuestProgress3} />
                            <ClaimButton
                                isLocked={dailyQuestProgress3 !== 1.0}
                                onPress={() => {}}
                            />
                        </View>
                    </View>
                </View>
                <Text style={styles.rewardsText}>Vos Récompenses</Text>
                <View style={styles.blueRectangleLarge}>

                    {[Film, Ticket, Music, Palette].map((Icon, index) => (
                        <TouchableOpacity key={index} style={styles.iconContainer} onPress={() => handleRewardPress(index)}>
                            <View style={styles.circularProgressContainer}>
                                <CircularProgress
                                    progress={rewardsProgress[index]}
                                    size={100}
                                    strokeWidth={10}
                                    color="#AAD492"
                                />
                                <View style={styles.iconWrapper}>
                                    <Icon size={50} color="white" />
                                </View>
                            </View>
                            <Text style={styles.iconText}>
                                {['Place de cinéma', 'Bon d\'achat', 'Place de concert', 'Atelier'][index]}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.bottomSpace}></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
    },
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    topSpace: {
        height: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 28,
        marginTop: 20,
        fontWeight: '700',
        fontFamily: 'Helvetica Neue',
    },
    blueRectangle: {
        height: 160,
        width: 350,
        borderRadius: 15,
        backgroundColor: '#4F88A6',
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 15,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    greenRectangle: {
        height: 280,
        width: 350,
        borderRadius: 15,
        backgroundColor: '#AAD492',
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    progressBarWithButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    xpText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Helvetica Neue',
    },
    remainingXpText: {
        color: 'white',
        fontSize: 16,
        marginTop: 10,
        fontFamily: 'Helvetica Neue',
    },
    questText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
        fontFamily: 'Helvetica Neue',
    },
    levelText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center',
        fontFamily: 'Helvetica Neue',
    },
    rewardsText: {
        color: 'white',
        fontSize: 28,
        marginTop: 20,
        fontWeight: '700',
        fontFamily: 'Helvetica Neue',
    },
    blueRectangleLarge: {
        height: 320,
        width: 350,
        borderRadius: 15,
        backgroundColor: '#4F88A6',
        marginTop: 20,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    bottomSpace: {
        height: 50,
    },
    iconContainer: {
        alignItems: 'center',
        margin: 10,
        width: '40%',
    },
    circularProgressContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper: {
        position: 'absolute',
    },
    iconText: {
        color: 'white',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Helvetica Neue',
    },
});