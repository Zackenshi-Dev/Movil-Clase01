import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
// Componentes para manejar el área segura (muescas/notches de teléfonos modernos)
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// 1. Definición del tipo de dato para una Tarea
interface Task {
  id: string;
  value: string;
}

export default function App() {
  const [task, setTask] = useState(""); // Maneja el texto que el usuario escribe
  const [taskList, setTaskList] = useState<Task[]>([]); // Almacena el arreglo de tareas

  // 3. Función para añadir una nueva tarea
  const addTask = () => {
    // Validar que no esté vacío
    if (task.trim().length === 0) return;

    // Actualizar el estado de la lista añadiendo un objeto con un ID único
    setTaskList([
      ...taskList,
      {
        id: Math.random().toString(),
        value: task,
      },
    ]);

    // Limpiar el input después de añadir
    setTask("");
  };

  // 4. Función para eliminar una tarea por su ID
  const deleteTask = (id: string) => {
    // Filtramos la lista para quitar el elemento que coincida con el ID
    setTaskList(taskList.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Título de la Aplicación */}
        <Text style={styles.title}>Mis Tareas 📝</Text>

        {/* Encabezado e Input para nuevas tareas */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="¿Qué tienes pendiente?"
            style={styles.input}
            onChangeText={setTask}
            value={task}
            placeholderTextColor="#94a3b8"
          />
          <TouchableOpacity style={styles.button} onPress={addTask}>
            <Text style={styles.buttonText}>Añadir</Text>
          </TouchableOpacity>
        </View>

        {/* 5. Lista de Tareas usando FlatList */}
        <FlatList
          data={taskList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.taskItem}
              onPress={() => deleteTask(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.taskText}>{item.value}</Text>
              <View style={styles.deleteButton}>
                <Text style={styles.deleteIcon}>🗑️</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

      <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 30,
    marginTop: 10,
    textAlign: "left",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#0f172a",
    elevation: 2,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  taskItem: {
    padding: 18,
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  taskText: {
    fontSize: 16,
    color: "#334155",
    fontWeight: "500",
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#fee2e2",
    padding: 8,
    borderRadius: 10,
  },
  deleteIcon: {
    fontSize: 18,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingVertical: 15,
    alignItems: "center",
    marginTop: "auto",
  },
  footerText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "600",
  },
  footerDate: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
  },
});
