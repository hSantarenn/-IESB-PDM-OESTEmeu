// components/CompromissoInput.js
// Campo controlado para cadastrar um novo compromisso.

import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { labels } from '../labels';

export default function CompromissoInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={labels.inputPlaceholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
        blurOnSubmit
        accessibilityLabel="Campo para novo compromisso"
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        android_ripple={{ color: '#ffffff55' }}
        onPress={onAdd}
        accessibilityRole="button"
        accessibilityLabel="Adicionar compromisso"
      >
        <Text style={styles.buttonText}>{labels.addButton}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  input: {
    width: '68%',
    height: 46,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  button: {
    width: '28%',
    height: 46,
    borderRadius: 8,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
