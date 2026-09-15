# RotinaIESB

Aplicativo em React Native com Expo para organizar compromissos da rotina acadêmica do aluno do IESB. É possível cadastrar, visualizar, remover e manter compromissos salvos mesmo depois de fechar e reabrir o aplicativo.

## Como o projeto foi criado

```bash
npx create-expo-app@latest RotinaIESB --template blank
cd RotinaIESB
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

## Como executar

Instale as dependências e inicie o Expo:

```bash
npm install
npx expo start
```

Depois, abra no Expo Go, em um emulador Android/iOS ou no navegador usando a opção web.

## Funcionalidades

- Cadastro de compromissos com validação de texto vazio.
- Identificador único e data de criação para cada compromisso.
- Remoção por identificador usando `Array.filter`.
- Lista renderizada com `FlatList` e `ListEmptyComponent`.
- Persistência local com `AsyncStorage`.
- Interface em uma única tela com cabeçalho, formulário e lista.
- Componentes reutilizáveis e rótulos centralizados.

## Estrutura do projeto

```text
RotinaIESB/
├── App.js
├── labels.js
├── assets/
│   └── logo.png
├── components/
│   ├── CompromissoInput.js
│   └── CompromissoList.js
├── app.json
├── babel.config.js
├── package.json
└── README.md
```

### Arquivos e responsabilidades

- `App.js`: estado dos compromissos, eventos, cabeçalho, formulário e persistência.
- `labels.js`: exportação nomeada dos textos exibidos na interface.
- `components/CompromissoInput.js`: campo controlado e botão de adicionar; recebe `value`, `onChangeText` e `onAdd` via props.
- `components/CompromissoList.js`: lista com `FlatList`, mensagem de lista vazia e botão de remoção; recebe `data` e `onRemove` via props.
- `assets/logo.png`: imagem local usada no cabeçalho.

## Persistência dos dados

A leitura inicial acontece no primeiro `useEffect` de `App.js`, que usa a chave `@rotina_iesb_compromissos` e converte o JSON salvo com `JSON.parse`.

O segundo `useEffect` salva a lista sempre que `compromissos` muda, depois que o carregamento inicial termina. A gravação utiliza `JSON.stringify` e `AsyncStorage.setItem`.

As operações de leitura e gravação possuem `try/catch` e exibem uma mensagem amigável em caso de erro.

## Prints para a entrega

Inclua no repositório ou no Pull Request três prints reais do aplicativo:

1. Tela vazia, mostrando a mensagem de lista vazia.
2. Tela com pelo menos dois compromissos cadastrados.
3. Tela após fechar e reabrir o app, mostrando que os dados continuam salvos.

## Entrega

Não inclua `node_modules/` nem `.expo/` no repositório. O `.gitignore` do projeto já está configurado para ignorar essas pastas.

A entrega deve conter o link do repositório Git e do Pull Request, conforme solicitado na atividade.
