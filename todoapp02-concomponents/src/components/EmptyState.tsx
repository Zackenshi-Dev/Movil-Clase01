import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

/**
 * COMPONENTE: EmptyState 
 * 
 * Se encarga de mostrar un mensaje motivador y una ayuda visual cuando
 * el usuario no tiene ninguna tarea en su lista.
 * 
 * PROPS:
 * - emoji?: string; // Icono visual central.
 * - title?: string; // Mensaje principal.
 * - subtitle?: string; // Instrucción o mensaje secundario.
 */
interface EmptyStateProps {
    emoji?: string;
    title?: string;
    subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    emoji = '✨',
    title = 'Todo listo',
    subtitle = 'Presiona el botón + para crear tu primera tarea'
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.glowCircle}>
                <Text style={styles.emoji}>{emoji}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80,
    },
    glowCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
    },
    emoji: {
        fontSize: 56,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 22,
    },
});

export default EmptyState;