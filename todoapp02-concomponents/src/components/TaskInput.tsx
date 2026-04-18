/**
 * COMPONENTE: TaskInput (Versión Pro)
 * 
 * En esta versión avanzada, el componente maneja el ciclo de vida del foco
 * de forma manual para garantizar una experiencia "smooth" (suave) tanto
 * en dispositivos móviles como en navegadores web.
 * 
 * CONCEPTOS PRO:
 * 1. useRef: Referencia directa al nodo del TextInput para manipular el foco.
 * 2. useEffect + Delay: Truco técnico para asegurar que el teclado/foco se active
 *    solo cuando la animación del modal ha terminado.
 * 3. Atributos Web: Optimizamos el input para navegadores (desactivar Grammarly, etc).
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  Platform
} from 'react-native';
import { theme } from '../constants/theme';

interface TaskInputProps {
  onAddTask: (task: string) => void;
  autoFocus?: boolean; // Determina si el input debe ganar el foco al aparecer
  onSubmit?: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({
  onAddTask,
  autoFocus = false,
  onSubmit
}) => {
  const [task, setTask] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Referencia para control manual del foco
  const inputRef = useRef<TextInput>(null);

  /**
   * GESTIÓN PRO DEL FOCO
   * Cuando autoFocus es true, esperamos 100ms para disparar el foco.
   * Esto soluciona problemas comunes donde el teclado no sube a tiempo en iOS/Android.
   */
  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        if (Platform.OS === 'web') {
          // En web, buscamos el elemento por un atributo data personalizado
          const inputElement = document.querySelector('input[data-task-input="true"]') as HTMLInputElement;
          if (inputElement) {
            inputElement.focus();
          }
        } else {
          // En Native, usamos la referencia directa ref.current
          inputRef.current?.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const handleChangeText = useCallback((text: string) => {
    setTask(text);
  }, []);

  const handleAddTask = useCallback(() => {
    const trimmedTask = task.trim();
    if (trimmedTask.length === 0) return;

    onAddTask(trimmedTask);
    setTask('');

    if (Platform.OS !== 'web') {
      Keyboard.dismiss();
    }

    onSubmit?.();
  }, [task, onAddTask, onSubmit]);

  /**
   * ATRIBUTOS ESPECÍFICOS PARA WEB
   * Desactivamos correctores automáticos y extensiones ruidosas (Grammarly)
   * para que la interfaz se sienta como una aplicación nativa en el navegador.
   */
  const webProps = Platform.OS === 'web' ? {
    // @ts-ignore - props web válidas
    'data-task-input': 'true',
    autoComplete: 'off',
    autoCorrect: 'off',
    spellCheck: 'false',
    'data-gramm': 'false',
    'data-gramm_editor': 'false',
    'data-enable-grammarly': 'false',
  } : {};

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        placeholder="¿Qué necesitas hacer?"
        placeholderTextColor={theme.colors.textMuted}
        style={[
          styles.input,
          isFocused && styles.inputFocused
        ]}
        onChangeText={handleChangeText}
        value={task}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleAddTask}
        returnKeyType="done"
        blurOnSubmit={false}
        {...(webProps as any)}
      />

      <TouchableOpacity
        style={[
          styles.button,
          task.trim().length === 0 && styles.buttonDisabled
        ]}
        onPress={handleAddTask}
        activeOpacity={0.8}
        disabled={task.trim().length === 0}
      >
        <Text style={styles.buttonText}>Añadir Tarea</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    marginBottom: 16,
    // Estilos específicos para Web para emular comportamiento nativo
    ...(Platform.OS === 'web' ? {
      outline: 'none',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    } : {}),
  },
  inputFocused: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.surfaceLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: theme.colors.background,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default TaskInput;