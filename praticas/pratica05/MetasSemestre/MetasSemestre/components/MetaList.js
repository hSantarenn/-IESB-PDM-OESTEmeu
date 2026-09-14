import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

function MetaItem({ meta, onDelete, onToggleComplete }) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => onToggleComplete(meta.id)}
        style={({ pressed }) => [styles.check, meta.concluida && styles.checkDone, pressed && styles.pressed]}
        android_ripple={{ color: '#dce3ff', borderless: true }}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: meta.concluida }}
      >
        {meta.concluida && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>
      <View style={styles.content}>
        <Text style={[styles.metaText, meta.concluida && styles.completedText]}>{meta.texto}</Text>
        <Text style={styles.date}>Criada em {new Date(meta.criadaEm).toLocaleDateString('pt-BR')}</Text>
      </View>
      <Pressable
        onPress={() => onDelete(meta.id)}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
        android_ripple={{ color: '#ffd7de', borderless: true }}
        accessibilityRole="button"
        accessibilityLabel={`Remover meta ${meta.texto}`}
      >
        <Text style={styles.deleteText}>×</Text>
      </Pressable>
    </View>
  );
}

export default function MetaList({ metas, onDelete, onToggleComplete, carregando }) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MetaItem meta={item} onDelete={onDelete} onToggleComplete={onToggleComplete} />
      )}
      contentContainerStyle={metas.length === 0 ? styles.emptyContainer : styles.list}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>{carregando ? '…' : '✦'}</Text>
          <Text style={styles.emptyTitle}>{carregando ? 'Carregando metas' : 'Nenhuma meta por aqui'}</Text>
          <Text style={styles.emptyText}>{carregando ? 'Buscando seus dados salvos.' : 'Adicione sua primeira meta e acompanhe sua evolução.'}</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 24 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center', paddingBottom: 100 },
  empty: { alignItems: 'center', paddingHorizontal: 24 },
  emptyIcon: { color: '#8b9df1', fontSize: 34, marginBottom: 12 },
  emptyTitle: { color: '#26334b', fontSize: 18, fontWeight: '800' },
  emptyText: { color: '#8a94a8', textAlign: 'center', lineHeight: 20, marginTop: 7 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e8ecf4' },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#c4ccdc', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  checkDone: { backgroundColor: '#5872db', borderColor: '#5872db' },
  checkmark: { color: '#fff', fontSize: 15, fontWeight: '800' },
  content: { flex: 1, marginHorizontal: 12 },
  metaText: { color: '#253149', fontSize: 15, fontWeight: '600' },
  completedText: { color: '#9ba4b4', textDecorationLine: 'line-through' },
  date: { color: '#a1a9b8', fontSize: 11, marginTop: 5 },
  deleteButton: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  deleteText: { color: '#db7184', fontSize: 25, fontWeight: '300', lineHeight: 28 },
  pressed: { opacity: 0.6 },
});
