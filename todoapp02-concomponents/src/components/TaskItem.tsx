import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';

/**
 * COMPONENTE: TaskItem
 * 
 * Representa una fila individual dentro de la lista de tareas.
 * Es un componente de presentación que recibe datos y avisa al padre
 * mediante un callback cuando se desea eliminar.
 * 
 * PROPS:
 * - id: string; // Identificador único de la tarea.
 * - value: string; // El texto descriptivo de la tarea.
 * - onDelete: (id: string) => void; // Función para notificar la eliminación al padre.
 */
interface TaskItemProps {
  id: string;
  value: string;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, value, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.indicator} />
        <Text style={styles.text} numberOfLines={2}>{value}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(id)}
        activeOpacity={0.6}
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 3,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 4,
    height: 32,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    marginRight: 12,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 46, 99, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteIcon: {
    fontSize: 18,
  },
});

export default TaskItem;