// App.js
// Tela principal do RotinaIESB: cabeçalho, formulário, lista e persistência local.

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { labels } from './labels';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [compromissos, setCompromissos] = useState([]);
  const [texto, setTexto] = useState('');
  const [carregado, setCarregado] = useState(false);

  // Aula 06: carrega a lista salva quando o app é montado.
  useEffect(() => {
    async function carregarDados() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json !== null) {
          const dados = JSON.parse(json);
          setCompromissos(Array.isArray(dados) ? dados : []);
        }
      } catch (erro) {
        Alert.alert(labels.errorTitle, labels.loadErrorMessage);
      } finally {
        setCarregado(true);
      }
    }

    carregarDados();
  }, []);

  // Aula 06: salva novamente sempre que a lista mudar após o carregamento.
  useEffect(() => {
    if (!carregado) return;

    async function salvarDados() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        Alert.alert(labels.errorTitle, labels.saveErrorMessage);
      }
    }

    salvarDados();
  }, [compromissos, carregado]);

  function gerarId() {
    return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  }

  function adicionarCompromisso() {
    const textoLimpo = texto.trim();

    if (textoLimpo.length === 0) {
      Alert.alert(labels.invalidTitle, labels.invalidMessage);
      return;
    }

    const novoItem = {
      id: gerarId(),
      texto: textoLimpo,
      criadoEm: new Date().toISOString(),
    };

    setCompromissos((listaAtual) => [...listaAtual, novoItem]);
    setTexto('');
  }

  function removerCompromisso(id) {
    setCompromissos((listaAtual) =>
      listaAtual.filter((item) => item.id !== id)
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" backgroundColor="#4f46e5" />

        <View style={styles.header}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
            accessibilityLabel="Logo do RotinaIESB"
          />
          <View style={styles.headerTextArea}>
            <Text style={styles.headerTitle}>{labels.headerTitle}</Text>
            <Text style={styles.headerSubtitle}>{labels.headerSubtitle}</Text>
          </View>
        </View>

        {!carregado ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>{labels.loadingMessage}</Text>
          </View>
        ) : (
          <>
            <View style={styles.formArea}>
              <CompromissoInput
                value={texto}
                onChangeText={setTexto}
                onAdd={adicionarCompromisso}
              />
            </View>

            <View style={styles.listArea}>
              <CompromissoList
                data={compromissos}
                onRemove={removerCompromisso}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  logo: {
    width: 52,
    height: 52,
    marginRight: 12,
    borderRadius: 12,
  },
  headerTextArea: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#e0e0ff',
    fontSize: 13,
    marginTop: 4,
  },
  formArea: {
    backgroundColor: '#f2f2f7',
  },
  listArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    color: '#666',
    fontSize: 15,
  },
});
