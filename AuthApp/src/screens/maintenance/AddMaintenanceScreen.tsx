import { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import ScreenWrapper from '../../components/ScreenWrapper';
import ScreenHeader from '../../components/ScreenHeader';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'AddMaintenance'>;
const types = ['Cambio de aceite', 'Filtro de aire', 'Frenos', 'Batería', 'Llantas', 'Alineación', 'Refrigerante', 'A/C', 'Otro'];
export default function AddMaintenanceScreen({ route, navigation }: Props) {
  const { colors } = useTheme(); const { vehicles, addMaintenance } = useApp(); const vehicle = vehicles.find((item) => item.id === route.params.vehicleId);
  const [form, setForm] = useState({ type: types[0], date: new Date().toLocaleDateString('es-HN'), mileage: vehicle ? String(vehicle.mileage) : '', cost: '', notes: '', nextMileage: vehicle ? String(vehicle.mileage + 5000) : '' }); const [error, setError] = useState('');
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const save = () => { const mileage = Number(form.mileage), cost = Number(form.cost || 0), nextMileage = Number(form.nextMileage); if (!form.date || !Number.isFinite(mileage) || !Number.isFinite(nextMileage)) { setError('Completa fecha, kilometraje y próximo kilometraje.'); return; } addMaintenance({ vehicleId: route.params.vehicleId, type: form.type, date: form.date, mileage, cost, notes: form.notes, nextMileage }); Alert.alert('Mantenimiento guardado', 'El registro se agregó al historial.', [{ text: 'Continuar', onPress: () => navigation.goBack() }]); };
  return <ScreenWrapper><ScreenHeader icon="construct-outline" title="Mantenimiento" subtitle={vehicle?.name || 'Vehículo'} /><View style={[styles.form, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.label, { color: colors.text }]}>Tipo de mantenimiento</Text><View style={styles.types}>{types.map((type) => <TouchableOpacity key={type} onPress={() => update('type', type)} style={[styles.chip, { backgroundColor: colors.background }, form.type === type && { backgroundColor: colors.primarySoft }]}><Text style={[styles.chipText, { color: colors.secondaryText }, form.type === type && { color: colors.primary, fontWeight: '700' }]}>{type}</Text></TouchableOpacity>)}</View><CustomInput label="Fecha" placeholder="18/09/2026" value={form.date} onChangeText={(v) => update('date', v)} /><CustomInput label="Kilometraje" placeholder="185420" keyboardType="numeric" value={form.mileage} onChangeText={(v) => update('mileage', v)} /><CustomInput label="Costo" placeholder="1200" keyboardType="numeric" value={form.cost} onChangeText={(v) => update('cost', v)} /><CustomInput label="Próximo mantenimiento (km)" placeholder="190420" keyboardType="numeric" value={form.nextMileage} onChangeText={(v) => update('nextMileage', v)} /><CustomInput label="Notas" placeholder="Describe el trabajo realizado" multiline value={form.notes} onChangeText={(v) => update('notes', v)} />{error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}<CustomButton title="Guardar mantenimiento" icon="save-outline" onPress={save} /></View></ScreenWrapper>;
}
const styles = StyleSheet.create({ form: { borderRadius: 22, padding: 20, borderWidth: StyleSheet.hairlineWidth }, label: { fontSize: 14, fontWeight: '700', marginBottom: 8 }, types: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 }, chip: { paddingHorizontal: 11, paddingVertical: 8, borderRadius: 16, marginRight: 6, marginBottom: 6 }, chipText: { fontSize: 13 }, error: { marginBottom: 8 } });
