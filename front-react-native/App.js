import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './composants/Login';
import { StyleContextProvider } from './contexts/style.context';
import { ProfilContextProvider } from './contexts/profil.context';

export default function App() {
  return (
    <ProfilContextProvider>
      <StyleContextProvider>
        <View style={styles.container}>
          {/* <Text>Début des emmerdes avec react-native</Text> */}
          <Login/>
          <StatusBar style="auto" />
        </View>
      </StyleContextProvider>
    </ProfilContextProvider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});
