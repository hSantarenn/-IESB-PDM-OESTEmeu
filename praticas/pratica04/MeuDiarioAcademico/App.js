import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importação dos rótulos criados em labels.js (Requisito A)
import {
  titulo_app,
  rotulo_input_disciplina,
  rotulo_btn_adicionar,
  rotulo_lista_disciplinas,
  rotulo_switch_obrigatorias,
} from './labels';

// Lista estática de disciplinas (por enquanto sem cadastro real,
// conforme pedido no enunciado — o foco aqui é layout/componentes).
const disciplinasIniciais = [
  { id: '1', nome: 'Programação para Dispositivos Móveis' },
  { id: '2', nome: 'Engenharia de Software' },
  { id: '3', nome: 'Banco de Dados II' },
  { id: '4', nome: 'Redes de Computadores' },
];

export default function App() {
  // Estado usado apenas no desafio opcional (Switch/Pressable).
  // Não é obrigatório para a atividade principal, mas é necessário
  // para o Switch funcionar como componente controlado.
  const [apenasObrigatorias, setApenasObrigatorias] = useState(false);

  return (
    // SafeAreaView (do pacote react-native-safe-area-context) evita que o
    // conteúdo fique atrás do notch/barra de status em qualquer dispositivo.
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>{titulo_app}</Text>
      </View>

      {/* Linha com TextInput (~70%) + Botão (~28%) usando flexDirection: 'row' */}
      <View style={styles.linhaCadastro}>
        <TextInput
          style={styles.input}
          placeholder={rotulo_input_disciplina}
        />

        {/* Pressable no lugar de Button (Desafio opcional), com estilo
            diferente enquanto pressionado */}
        <Pressable
          style={({ pressed }) => [
            styles.botao,
            pressed && styles.botaoPressionado,
          ]}
        >
          <Text style={styles.botaoTexto}>{rotulo_btn_adicionar}</Text>
        </Pressable>
      </View>

      {/* Switch (Desafio opcional) — ainda sem filtro real */}
      <View style={styles.linhaSwitch}>
        <Text style={styles.switchTexto}>{rotulo_switch_obrigatorias}</Text>
        <Switch
          value={apenasObrigatorias}
          onValueChange={setApenasObrigatorias}
        />
      </View>

      {/* Título da lista */}
      <Text style={styles.tituloLista}>{rotulo_lista_disciplinas}</Text>

      {/* Lista estática, usando .map */}
      <View style={styles.lista}>
        {disciplinasIniciais.map((disciplina) => (
          <View key={disciplina.id} style={styles.item}>
            <Text style={styles.itemTexto}>{disciplina.nome}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1 faz o container ocupar toda a tela disponível — sem isso,
    // a SafeAreaView só teria a altura do próprio conteúdo.
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  header: {
    marginBottom: 16,
    alignItems: 'center', // centraliza o título horizontalmente (eixo transversal)
  },
  headerTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },

  linhaCadastro: {
    flexDirection: 'row', // organiza input e botão lado a lado
    alignItems: 'center', // alinha input e botão verticalmente no centro
    justifyContent: 'space-between', // dá um respiro entre os dois elementos
    marginBottom: 12,
  },
  input: {
    // Uso de dimensão percentual (Requisito D)
    width: '68%',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  botao: {
    // Uso de flex (Requisito D) — ocupa o espaço restante da linha
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#3366ff',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center', // centraliza o texto dentro do botão
    justifyContent: 'center',
  },
  botaoPressionado: {
    backgroundColor: '#254bcc', // feedback visual ao pressionar
    opacity: 0.85,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
  },

  linhaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchTexto: {
    fontSize: 14,
    color: '#444',
  },

  tituloLista: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },

  lista: {
    flex: 1, // permite que a lista ocupe o restante do espaço vertical
  },
  item: {
    margin: 6,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#e6ecff',
  },
  itemTexto: {
    fontSize: 15,
    color: '#222',
  },
});
