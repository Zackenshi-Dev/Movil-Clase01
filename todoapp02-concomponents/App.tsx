/**
 * EJERCICIO 08b: TODO App - Nivel Profesional (Arquitectura & UX)
 * 
 * Esta es la versión final y más avanzada de la aplicación. 
 * Se enfoca en buenas prácticas de arquitectura, optimización de rendimiento
 * y una experiencia de usuario (UX) pulida.
 * 
 * CONCEPTOS AVANZADOS INTRODUCIDOS:
 * 1. useCallback: Optimizamos el rendimiento memorizando funciones para evitar
 *    re-renderizados innecesarios en componentes hijos.
 * 2. Arquitectura de Temas: Uso de constantes centralizadas para mantener 
 *    la identidad visual en toda la app.
 * 3. Modales de Confirmación: Implementación de flujos de seguridad (confirmar antes de borrar).
 * 4. Adaptabilidad de Plataforma: Manejo específico de lógica para Web y Móvil.
 */

import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  Platform,
  Keyboard,
  ScrollView
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Organización modular: Importamos componentes especializados
import Header from './src/components/Header';
import TaskItem from './src/components/TaskItem';
import Footer from './src/components/Footer';
import EmptyState from './src/components/EmptyState';
import DeleteConfirmModal from './src/components/DeleteConfirmModal';
import TaskModal from './src/components/TaskModal';

// Sistema de diseño centralizado
import { theme } from './src/constants/theme';

interface Task {
  id: string;
  value: string;
}

export default function App() {
  // Estado de la lista principal
  const [taskList, setTaskList] = useState<Task[]>([]);
  // Estado para controlar la visibilidad del modal de creación
  const [addModalVisible, setAddModalVisible] = useState(false);

  /**
   * ESTADO DE ELIMINACIÓN
   * En esta versión profesional, agrupamos la información del modal de borrado
   * en un solo objeto de estado para mayor limpieza.
   */
  const [deleteModal, setDeleteModal] = useState<{
    visible: boolean;
    taskId: string;
    taskName: string;
  }>({
    visible: false,
    taskId: '',
    taskName: ''
  });

  /**
   * OPTIMIZACIÓN: useCallback
   * Envolvemos estas funciones en useCallback para que su referencia no cambie
   * en cada renderizado, lo cual es vital cuando se pasan a componentes hijos
   * envueltos en React.memo.
   */
  const handleAddTask = useCallback((taskTitle: string) => {
    setTaskList((current) => [
      ...current,
      { id: Date.now().toString(), value: taskTitle },
    ]);
  }, []);

  // Función para abrir el modal de confirmación antes de borrar
  const handleDeleteRequest = useCallback((id: string, name: string) => {
    setDeleteModal({
      visible: true,
      taskId: id,
      taskName: name
    });
  }, []);

  // Función definitiva de borrado tras confirmar
  const handleConfirmDelete = useCallback(() => {
    setTaskList((current) =>
      current.filter((t) => t.id !== deleteModal.taskId)
    );
    setDeleteModal(prev => ({ ...prev, visible: false }));
  }, [deleteModal.taskId]);

  /**
   * GESTIÓN DE INTERFAZ (Web vs Nativo)
   * Dependiendo de la plataforma, el foco y el teclado se manejan de forma distinta.
   */
  const closeAddModal = () => {
    setAddModalVisible(false);
    if (Platform.OS === 'web') {
      // En Web, eliminamos el foco del botón para limpiar el estado visual
      setTimeout(() => {
        const activeElement = document.activeElement as HTMLElement;
        activeElement?.blur?.();
      }, 50);
    } else {
      // En Móvil, simplemente ocultamos el teclado de software
      Keyboard.dismiss();
    }
  };

  /**
   * RENDERIZADO: Función de ayuda para el FlatList
   */
  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem
      id={item.id}
      value={item.value}
      onDelete={(id) => handleDeleteRequest(id, item.value)}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* HEADER: Conecta con el tema y dispara la acción de añadir */}
        <Header
          taskCount={taskList.length}
          onAddPress={() => setAddModalVisible(true)}
          title="Mis Tareas"
        />

        {/**
         * RENDERIZADO CONDICIONAL POR PLATAFORMA
         * En Web usamos ScrollView + map para mayor fluidez de scroll en navegadores,
         * mientras que en móvil FlatList es superior por su gestión de memoria.
         */}
        {Platform.OS === 'web' ? (
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {taskList.length === 0 ? (
              <EmptyState />
            ) : (
              taskList.map((item) => (
                <TaskItem
                  key={item.id}
                  id={item.id}
                  value={item.value}
                  onDelete={(id) => handleDeleteRequest(id, item.value)}
                />
              ))
            )}
          </ScrollView>
        ) : (
          <FlatList
            data={taskList}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={EmptyState}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* PIE DE PÁGINA: Consumidor del sistema de versiones */}
        <Footer version="v3.b" subtitle="Architecture & Themes" />

        {/* MODAL DE CREACIÓN: Comunicación bidireccional */}
        <TaskModal
          visible={addModalVisible}
          onClose={closeAddModal}
          onAdd={handleAddTask}
        />

        {/* MODAL DE SEGURIDAD: Paso extra de UX para evitar borrados accidentales */}
        <DeleteConfirmModal
          visible={deleteModal.visible}
          taskName={deleteModal.taskName}
          onCancel={() => setDeleteModal(prev => ({ ...prev, visible: false }))}
          onConfirm={handleConfirmDelete}
        />

        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Estilos globales consistentes con el tema
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexGrow: 1,
  },
});