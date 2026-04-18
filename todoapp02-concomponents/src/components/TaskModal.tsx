import React, { useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Platform,
    Pressable,
} from 'react-native';
import { theme } from '../constants/theme';
import TaskInput from './TaskInput';

interface TaskModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (task: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ visible, onClose, onAdd }) => {

    // Reset cuando se cierra
    useEffect(() => {
        if (!visible && Platform.OS === 'web') {
            // Limpiar focus cuando se cierra
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement && activeElement.blur) {
                activeElement.blur();
            }
        }
    }, [visible]);

    const handleAdd = (task: string) => {
        onAdd(task);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
            supportedOrientations={['portrait', 'landscape']}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={styles.centerContainer}>
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        <View style={styles.container}>
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.title}>Nueva Tarea</Text>
                                <View style={styles.accentLine} />
                            </View>

                            {/* Usar TaskInput componente */}
                            <TaskInput
                                onAddTask={handleAdd}
                                autoFocus={true}
                                onSubmit={onClose}
                            />
                        </View>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(5, 5, 15, 0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    centerContainer: {
        width: '100%',
        maxWidth: 400,
    },
    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: 28,
        padding: 28,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 30,
        elevation: 20,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: theme.colors.text,
        textAlign: 'center',
    },
    accentLine: {
        width: 60,
        height: 4,
        backgroundColor: theme.colors.primary,
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
});

export default TaskModal;
