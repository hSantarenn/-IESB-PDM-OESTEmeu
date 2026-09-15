// components/CompromissoList.js
// Lista de compromissos usando FlatList.

import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { labels } from '../labels';

function Item({ item, onRemove }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.texto}</Text>

      <Pressable
        style={({ pressed }) => [
          styles.removeButton,
          pressed && styles.removeButtonPressed,
        ]}
        android_ripple={{ color: '#ffffff88' }}
        onPress={() => onRemove(item.id)}
        accessibilityRole="button"
        accessibilityLabel={`Remover compromisso ${item.texto}`}
      >
        <Text style={styles.removeButtonText}>{labels.removeButton}</Text>
      </Pressable>
    </View>
  );
}

function ListaVazia() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{labels.emptyListMessage}</Text>
    </View>
  );
}

export default function CompromissoList({ data, onRemove }) {
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={data.length === 0 ? styles.emptyListContent : styles.listContent}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Item item={item} onRemove={onRemove} />}
      ListEmptyComponent={<ListaVazia />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    marginRight: 12,
  },
  removeButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  removeButtonPressed: {
    opacity: 0.8,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
});
