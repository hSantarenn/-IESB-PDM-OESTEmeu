# MetasSemestre — Prática 05 e 06

Aplicativo React Native/Expo para cadastrar e acompanhar metas acadêmicas do semestre. O projeto aplica **useState**, **props**, **componentização**, **Pressable**, **FlatList**, **useEffect** e **AsyncStorage**, mantendo as metas salvas mesmo depois de fechar e reabrir o aplicativo.

## Relação com as aulas

A implementação segue o arquivo de referência das Aulas 05 e 06:

- **Aula 05:** substituição de listas renderizadas com `.map()` por `FlatList`, carregamento inicial com `useEffect` e persistência local com `AsyncStorage`.
- **Aula 06:** organização do código em componentes reutilizáveis (`MetaInput` e `MetaList`), com comunicação por props.
- O desafio opcional também foi incluído: marcar metas como concluídas e exibir o contador de pendentes/concluídas.

## Como executar

```bash
cd pratica05/MetasSemestre
npm install
npx expo start
```

Depois, abra com o Expo Go, emulador Android/iOS ou no navegador quando aplicável.

## Estrutura principal

```text
MetasSemestre/
├── App.js
├── components/
│   ├── MetaInput.js
│   └── MetaList.js
├── assets/
│   └── icon.png
└── README.md
```

### Componentes e props

`components/MetaInput.js` contém o `TextInput` e o botão `Pressable` de adição. Recebe `value`, `onChangeText` e `onAdd`.

`components/MetaList.js` contém a `FlatList` e o card visual de cada meta. Recebe `metas`, `onDelete`, `onToggleComplete` e `carregando`. A remoção usa o `id` estável do item, nunca o índice da lista.

## Persistência com AsyncStorage

O primeiro `useEffect`, em `App.js`, possui dependências vazias (`[]`) e executa apenas na montagem. Ele lê a chave `@metas_semestre` com `AsyncStorage.getItem`, converte o resultado com `JSON.parse` e popula o estado com `setMetas`.

O segundo `useEffect` observa `metas`. Sempre que a lista muda, ele salva a lista atualizada com `AsyncStorage.setItem` e `JSON.stringify`. A referência `dadosCarregados` evita salvar o estado vazio inicial antes que a leitura termine. Os dois fluxos possuem `try/catch` e exibem uma mensagem amigável com `Alert` em caso de erro.

## Teste de regressão

1. Abra o app e confirme a tela de lista vazia.
2. Tente adicionar uma meta vazia e confirme que um `Alert` aparece.
3. Adicione 3 ou mais metas.
4. Adicione 15 ou mais metas para validar a rolagem da `FlatList`.
5. Toque no círculo de uma meta para marcá-la como concluída e confira o texto riscado e o contador.
6. Remova uma meta pelo botão `×`.
7. Feche completamente o app, inclusive removendo-o da lista de recentes.
8. Abra o app novamente e confirme que as metas continuam disponíveis.

## Fluxo Git sugerido

```bash
git checkout -b feature/pratica05-06
git add .
git commit -m "Feat: adiciona metas com FlatList e persistência local"
git push origin feature/pratica05-06
```

Após o push, abra o Pull Request no repositório da disciplina e inclua capturas da lista vazia, da lista com itens e da lista após reabrir o app.
