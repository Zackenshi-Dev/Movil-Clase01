import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { theme } from '../constants/theme';

/**
 * COMPONENTE: Header
 * 
 * Este componente muestra el título de la aplicación y un "FAB" (Floating Action Button)
 * para disparar la apertura del modal. Recibe el conteo de tareas para mostrar
 * un indicador dinámico de pendientes.
 * 
 * PROPS:
 * - taskCount: number; // Cantidad de tareas actuales. Se usa para mostrar un contador dinámico.
 * - onAddPress: () => void; // Función que se ejecuta al presionar el botón FAB. Típicamente abre un modal.
 * - title?: string; // Título opcional para el encabezado. Por defecto es 'Mis Tareas'.
 * 
 * LAYOUT
 * - Contenedor principal (View) con flexDirection: 'row' para alinear el texto y el FAB.
 * - textContainer (View) a la izquierda, contiene el título y el badge del contador.
 * - titleRow (View) dentro de textContainer para alinear el título y el emoji.
 * - badge (View) muestra el número de tareas pendientes con estilos de tarjeta.
 * - fab (TouchableOpacity) a la derecha, es un botón circular para añadir tareas.
 */
interface HeaderProps {
    taskCount: number;  // Cantidad de tareas actuales
    onAddPress: () => void; // Función para abrir el modal (enviada desde App)
    title?: string;
}
const Header: React.FC<HeaderProps> = ({ taskCount, onAddPress, title = 'Mis Tareas' }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.emojiContainer}>
                        <Text style={styles.emoji}>✨</Text>
                    </View>
                </View>
                <View style={styles.badge}>
                    <Text style={styles.counter}>
                        {taskCount} {taskCount === 1 ? 'pendiente' : 'pendientes'}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.fab}
                onPress={onAddPress}
                activeOpacity={0.8}
                {...(Platform.OS === 'web' ? { onClick: onAddPress } : {})}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        marginBottom: 10,
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: theme.colors.text,
        letterSpacing: -0.5,
    },
    emojiContainer: {
        marginLeft: 8,
        // Simular glow con sombra de caja en lugar de textShadow
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
    },
    emoji: {
        fontSize: 28,
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.accent,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(131, 56, 236, 0.5)',
        shadowColor: theme.colors.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
    },
    counter: {
        fontSize: 12,
        color: theme.colors.text,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    fab: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.primaryGlow,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 25,
        elevation: 15,
        cursor: 'pointer',
    },
    fabText: {
        fontSize: 36,
        color: theme.colors.background,
        fontWeight: '300',
        marginTop: -2,
    },
});

export default Header;