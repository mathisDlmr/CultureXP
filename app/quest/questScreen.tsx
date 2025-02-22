import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Film, Ticket, Music, Palette } from 'lucide-react-native';
import BarreProgression from '../../components/BarreProgression';
import ClaimButton from '../../components/ClaimButton';

export default function QuestScreen() {
    const xp = 750;
    const maxXp = 2000;
    const progress = xp / maxXp;
    const xpRemaining = maxXp - xp;

    const dailyQuestProgress1 = 0.0;
    const dailyQuestProgress2 = 0.5;
    const dailyQuestProgress3 = 1.0;

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
                    <View style={styles.progressBarContainer}>
                        <Text style={styles.questText}>Écouter un podcast ({(dailyQuestProgress1 * 100).toFixed(0)}%)</Text>
                        <View style={styles.progressBarWithButton}>
                            <BarreProgression backgroundColor="white" progressColor="#4F88A6" progress={dailyQuestProgress1} />
                            <ClaimButton
                                isLocked={dailyQuestProgress1 !== 1.0}
                                onPress={() => {}}
                            />
                        </View>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <Text style={styles.questText}>30 min d'audiobook ({(dailyQuestProgress2 * 100).toFixed(0)}%)</Text>
                        <View style={styles.progressBarWithButton}>
                            <BarreProgression backgroundColor="white" progressColor="#4F88A6" progress={dailyQuestProgress2} />
                            <ClaimButton
                                isLocked={dailyQuestProgress2 !== 1.0}
                                onPress={() => {}}
                            />
                        </View>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <Text style={styles.questText}>Laisser un avis ({(dailyQuestProgress3 * 100).toFixed(0)}%)</Text>
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
                    <View style={styles.iconContainer}>
                        <Film size={50} color="white" />
                        <Text style={styles.iconText}>Place de cinéma</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Ticket size={50} color="white" />
                        <Text style={styles.iconText}>Bon d'achat</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Music size={50} color="white" />
                        <Text style={styles.iconText}>Place de concert</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Palette size={50} color="white" />
                        <Text style={styles.iconText}>Atelier</Text>
                    </View>
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
        fontWeight: '600',
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
    progressBarContainer: {
        width: '70%',
        marginTop: 20,
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
        fontWeight: '600',
        fontFamily: 'Helvetica Neue',
    },
    blueRectangleLarge: {
        height: 200,
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
        height: 200,
    },
    iconContainer: {
        alignItems: 'center',
        margin: 10,
        width: '40%',
    },
    iconText: {
        color: 'white',
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
        fontFamily: 'Helvetica Neue',
    },
});