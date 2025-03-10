import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ClaimButtonProps {
    isLocked: boolean;
    onPress: () => void;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ isLocked, onPress }) => {
    if (isLocked) {
        return null;
    }

    return (
        <TouchableOpacity
            style={[styles.button, styles.claimButton]}
            onPress={onPress}
            disabled={isLocked}
        >
            <Text style={styles.buttonText}>Claim</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginLeft: 10,
    },
    claimButton: {
        backgroundColor: '#4CAF50',
    },
    lockedButton: {
        backgroundColor: '#B0B0B0',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ClaimButton;
