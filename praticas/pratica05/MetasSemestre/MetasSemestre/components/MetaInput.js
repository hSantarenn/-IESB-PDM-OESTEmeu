import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>NOVA META</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Ex.: estudar 30 minutos"
          placeholderTextColor="#98a1b2"
          returnKeyType="done"
          onSubmitEditing={onAdd}
          maxLength={100}
        />
        <Pressable
          onPress={onAdd}
          android_ripple={{ color: '#7184e8' }}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          accessibilityRole="button"
          accessibilityLabel="Adicionar meta"
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 18 },
  label: { color: '#68738a', fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 10 },
  input: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e3e8f1', borderRadius: 14, paddingHorizontal: 16, height: 52, color: '#1d2739', fontSize: 15 },
  button: { width: 52, height: 52, borderRadius: 14, backgroundColor: '#5872db', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  buttonPressed: { opacity: 0.78, transform: [{ scale: 0.96 }] },
  buttonText: { color: '#fff', fontSize: 28, fontWeight: '300', lineHeight: 30 },
});
