import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

interface FooterProps {
    version?: string;
    subtitle?: string;
}

const Footer: React.FC<FooterProps> = ({ version = 'v3', subtitle = 'Dark Mode 2026' }) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>
                React Native 2026 <Text style={styles.accent}>|</Text> Todo App {version} <Text style={styles.accent}>|</Text> {subtitle}
            </Text>
            <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    line: {
        width: 40,
        height: 4,
        backgroundColor: theme.colors.primary,
        borderRadius: 2,
        marginBottom: 16,
        opacity: 0.5,
    },
    text: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    accent: {
        color: theme.colors.primary,
    },
    date: {
        fontSize: 11,
        color: theme.colors.textMuted,
        marginTop: 6,
        fontWeight: '500',
    },
});

export default Footer;