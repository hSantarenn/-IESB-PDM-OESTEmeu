import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const dadosCarregados = useRef(false);

  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos) {
          const metasSalvas = JSON.parse(dadosSalvos);
          setMetas(Array.isArray(metasSalvas) ? metasSalvas : []);
        }
      } catch (error) {
        Alert.alert('Não foi possível carregar', 'Suas metas salvas não puderam ser carregadas.');
      } finally {
        dadosCarregados.current = true;
        setCarregando(false);
      }
    }

    carregarMetas();
  }, []);

  useEffect(() => {
    if (!dadosCarregados.current) return;

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (error) {
        Alert.alert('Não foi possível salvar', 'Tente novamente para manter suas metas persistidas.');
      }
    }

    salvarMetas();
  }, [metas]);

  function adicionarMeta() {
    const textoLimpo = texto.trim();
    if (!textoLimpo) {
      Alert.alert('Meta inválida', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((metasAtuais) => [novaMeta, ...metasAtuais]);
    setTexto('');
    Keyboard.dismiss();
  }

  function removerMeta(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  function alternarConclusao(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta,
      ),
    );
  }

  const concluidas = metas.filter((meta) => meta.concluida).length;
  const pendentes = metas.length - concluidas;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('./assets/icon.png')} style={styles.logo} />
            <View style={styles.headerText}>
              <Text style={styles.eyebrow}>PLANEJAMENTO ACADÊMICO</Text>
              <Text style={styles.title}>Metas do semestre</Text>
              <Text style={styles.subtitle}>Pequenos passos, grandes conquistas.</Text>
            </View>
          </View>

          <View style={styles.statsCard}>
            <View>
              <Text style={styles.statsLabel}>SEU PROGRESSO</Text>
              <Text style={styles.statsValue}>{metas.length === 0 ? 'Comece agora' : `${concluidas} de ${metas.length} concluídas`}</Text>
            </View>
            <Text style={styles.statsCount}>{pendentes} pendente{pendentes === 1 ? '' : 's'}</Text>
          </View>

          <MetaInput value={texto} onChangeText={setTexto} onAdd={adicionarMeta} />

          <MetaList
            metas={metas}
            onDelete={removerMeta}
            onToggleComplete={alternarConclusao}
            carregando={carregando}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#101827' },
  container: { flex: 1, backgroundColor: '#f5f7fb', paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 24, paddingBottom: 20 },
  logo: { width: 56, height: 56, borderRadius: 16, marginRight: 14 },
  headerText: { flex: 1 },
  eyebrow: { color: '#5872db', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: '#172033', fontSize: 28, fontWeight: '800', marginTop: 2 },
  subtitle: { color: '#7b8498', fontSize: 13, marginTop: 3 },
  statsCard: { backgroundColor: '#18243b', borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  statsLabel: { color: '#8e9ab3', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  statsValue: { color: '#fff', fontSize: 17, fontWeight: '700', marginTop: 5 },
  statsCount: { color: '#9eafff', fontSize: 12, fontWeight: '700', backgroundColor: '#2a3a62', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10 },
});
