import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo1}>Hola</Text>
      <Text style={styles.titulo2}>Desde react-native</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#024870',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo1:{
    color:'#fff',
    fontSize:30

  },
  titulo2:{
    color:'#000000',
    fontSize:26

  }
});
