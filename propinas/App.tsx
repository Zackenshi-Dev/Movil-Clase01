import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function App() {
  const [amount, setAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(15);
  const [people, setPeople] = useState("1");

  const billAmount = parseFloat(amount) || 0;
  const numPeople = parseInt(people) || 1;
  const tipAmount = billAmount * (tipPercentage / 100);
  const totalAmount = billAmount + tipAmount;
  const perPerson = totalAmount / numPeople;

  const tipOptions = [10, 15, 20, 25, 30];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Propinas 🗣️</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Total de la cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder="$0.00"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View style={styles.tipSection}>
        <Text style={styles.label}>Propina: {tipPercentage}%</Text>
        <View style={styles.tipButtons}>
          {tipOptions.map((tip) => (
            <TouchableOpacity
              key={tip}
              style={[
                styles.tipButton,
                tipPercentage === tip && styles.tipButtonActive,
              ]}
              onPress={() => setTipPercentage(tip)}
            >
              <Text
                style={[
                  styles.tipButtonText,
                  tipPercentage === tip && styles.tipButtonTextActive,
                ]}
              >
                {tip}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Personas</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={people}
            onChangeText={setPeople}
          />
        </View>

        <View style={styles.results}>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Propina:</Text>
            <Text style={styles.resultValue}>${tipAmount.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Total:</Text>
          <Text style={styles.resultValue}>${totalAmount.toFixed(2)}</Text>
        </View>
        <View style={[styles.resultRow, styles.totalRow]}>
          <Text style={styles.resultLabel}>Por persona:</Text>
          <Text style={[styles.resultValue, styles.totalValue]}>
            ${perPerson.toFixed(2)}
          </Text>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1120", // Fondo ultra oscuro (Midnight Blue)
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#1E293B", // Un tono más claro que el fondo para crear profundidad
    borderRadius: 28,
    padding: 28,
    // En modo oscuro, las sombras no se notan tanto, así que usamos un borde sutil
    borderWidth: 1,
    borderColor: "#334155",
    // Mantenemos una sombra ligera para iOS
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#F8FAFC", // Blanco humo, menos agresivo que el blanco puro
    marginBottom: 28,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#94A3B8", // Gris azulado claro para mantener jerarquía
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#334155", // Borde sutil
    borderRadius: 16,
    padding: 18,
    fontSize: 18,
    fontWeight: "500",
    color: "#F8FAFC", // Texto claro al escribir
    backgroundColor: "#0F172A", // Fondo del input más oscuro que la tarjeta (hundido)
  },
  tipSection: {
    marginBottom: 24,
  },
  tipButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  tipButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#0F172A", // Mismo fondo "hundido" del input
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },
  tipButtonActive: {
    backgroundColor: "#082F49", // Fondo azul profundo (Sky 900)
    borderColor: "#38BDF8", // Borde cyan neón para destacar
  },
  tipButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#94A3B8",
  },
  tipButtonTextActive: {
    color: "#38BDF8", // Texto cyan a juego con el borde
    fontWeight: "700",
  },
  results: {
    marginTop: 16,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#94A3B8",
  },
  resultValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#F8FAFC", // Blanco humo para los resultados
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  totalValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#34D399", // Verde esmeralda brillante (versión clara para modo oscuro)
    letterSpacing: -0.5,
  },
});
