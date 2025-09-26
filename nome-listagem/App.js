import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Lista fixa de livros
const livros = [
  { id: '1', titulo: 'Dom Casmurro', autor: 'Machado de Assis', imagem: 'https://picsum.photos/200/300?random=1' },
  { id: '2', titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', imagem: 'https://picsum.photos/200/300?random=2' },
  { id: '3', titulo: '1984', autor: 'George Orwell', imagem: 'https://picsum.photos/200/300?random=3' },
];

// Tela de listagem
function ListaLivros({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📚 Lista de Livros</Text>
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.texto}>{item.titulo}</Text>
            <Text style={styles.autor}>Autor: {item.autor}</Text>
            <Button
              title="Ver Detalhes"
              onPress={() => navigation.navigate('Detalhes', { livro: item })}
            />
          </View>
        )}
      />
    </View>
  );
}

// Tela de detalhes
function DetalhesLivro({ route, navigation }) {
  const { livro } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{livro.titulo}</Text>
      <Text style={styles.autor}>Autor: {livro.autor}</Text>
      <Image
        source={{ uri: livro.imagem }}
        style={styles.imagem}
        resizeMode="cover"
      />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

// App principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaLivros">
        <Stack.Screen name="ListaLivros" component={ListaLivros} options={{ title: 'Lista de Livros' }} />
        <Stack.Screen name="Detalhes" component={DetalhesLivro} options={{ title: 'Detalhes do Livro' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos básicos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  item: {
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  texto: {
    fontSize: 18,
    fontWeight: '600',
  },
  autor: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
  },
  imagem: {
    width: 200,
    height: 300,
    marginVertical: 16,
    alignSelf: 'center',
    borderRadius: 8,
  },
});
