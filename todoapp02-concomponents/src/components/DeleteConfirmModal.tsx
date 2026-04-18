/**
 * COMPONENTE: DeleteConfirmModal
 * 
 * Este componente es una pieza clave de la UX Profesional. 
 * En lugar de usar un simple alert del sistema, creamos un diálogo 
 * personalizado que mantiene la estética de la aplicación (Dark Mode + Glow).
 * 
 * PROPÓSITO:
 * Evitar eliminaciones accidentales pidiendo confirmación al usuario
 * en una interfaz clara y centrada.
 * 
 * PROPS:
 * - visible: boolean; // Controla la aparición del modal.
 * - taskName: string; // Nombre de la tarea que se va a borrar (para feedback visual).
 * - onCancel: () => void; // Función para cerrar el modal sin hacer nada.
 * - onConfirm: () => void; // Función para ejecutar el borrado definitivo.
 */

import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, Platform
} from 'react-native';
import { theme } from '../constants/theme';

interface DeleteConfirmModalProps {
    visible: boolean;
    taskName: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    visible, taskName, onCancel, onConfirm
}) => {
    return (
        <Modal 
            visible={visible} 
            transparent 
            animationType="fade" 
            onRequestClose={onCancel}
        >
            {/* Overlay: Fondo oscuro semi-transparente para centrar el foco */}
            <Pressable style={styles.overlay} onPress={onCancel}>
                
                {/* Empaqueta el contenido para evitar que clicks internos cierren el modal */}
                <Pressable onPress={(e) => e.stopPropagation()}>
                    <View style={styles.container}>
                        
                        {/* Indicador visual de peligro (Papelera con Glow) */}
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>🗑️</Text>
                        </View>

                        <Text style={styles.title}>Eliminar Tarea</Text>

                        {/* Mensaje de feedback: Es vital mostrar QUÉ se va a borrar */}
                        <Text style={styles.message}>
                            ¿Seguro que quieres eliminar{''}
                            <Text style={styles.taskName}>"{taskName}"</Text>?
                        </Text>

                        {/* Acciones: El usuario siempre debe tener una salida (Cancelar) */}
                        <View style={styles.buttons}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={onCancel}
                                activeOpacity={0.8}
                                {...(Platform.OS === 'web' ? { onClick: onCancel } : {})}
                            >
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.deleteButton]}
                                onPress={onConfirm}
                                activeOpacity={0.8}
                                {...(Platform.OS === 'web' ? { onClick: onConfirm } : {})}
                            >
                                <Text style={styles.deleteText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(5, 5, 15, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: 28,
        padding: 32,
        width: '100%',
        maxWidth: 360,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        // Sombra temática de peligro
        shadowColor: theme.colors.danger,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 40,
    },
    iconContainer: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: 'rgba(255, 46, 99, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 2,
        borderColor: 'rgba(255, 46, 99, 0.3)',
    },
    icon: {
        fontSize: 44,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: theme.colors.text,
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 28,
    },
    taskName: {
        color: theme.colors.text,
        fontWeight: '700',
    },
    buttons: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: theme.colors.surfaceLight,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    deleteButton: {
        backgroundColor: theme.colors.danger,
        shadowColor: theme.colors.danger,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
    },
    cancelText: {
        color: theme.colors.textSecondary,
        fontWeight: '700',
        fontSize: 16,
    },
    deleteText: {
        color: theme.colors.text,
        fontWeight: '800',
        fontSize: 16,
    },
});

export default DeleteConfirmModal;
