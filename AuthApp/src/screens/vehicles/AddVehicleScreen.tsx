import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import ScreenWrapper from '../../components/ScreenWrapper';
import ScreenHeader from '../../components/ScreenHeader';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'AddVehicle'>;
export default function AddVehicleScreen({ navigation }: Props) {
  const { colors } = useTheme(); const { addVehicle } = useApp();
  const [form, setForm] = useState({ name: '', brand: '', model: '', year: '', plate: '', color: '', mileage: '' }); const [error, setError] = useState('');
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const save = () => { if (!form.name.trim() || !form.brand.trim() || !form.model.trim() || !form.year.trim() || !form.plate.trim() || !form.mileage.trim()) { setError('Completa todos los campos obligatorios.'); return; } const mileage = Number(form.mileage); if (!Number.isFinite(mileage) || mileage < 0) { setError('Ingresa un kilometraje válido.'); return; } addVehicle({ ...form, mileage }); Alert.alert('Vehículo guardado', 'El vehículo se agregó correctamente.', [{ text: 'Continuar', onPress: () => navigation.goBack() }]); };
  return <ScreenWrapper><ScreenHeader icon="car-sport-outline" title="Agregar vehículo" subtitle="Registra los datos de tu vehículo" /><View style={[styles.form, { backgroundColor: colors.surface, borderColor: colors.border }]}><CustomInput label="Nombre del vehículo *" placeholder="Mi Hyundai" value={form.name} onChangeText={(v) => update('name', v)} /><CustomInput label="Marca *" placeholder="Hyundai" value={form.brand} onChangeText={(v) => update('brand', v)} /><CustomInput label="Modelo *" placeholder="Accent" value={form.model} onChangeText={(v) => update('model', v)} /><CustomInput label="Año *" placeholder="2005" keyboardType="numeric" value={form.year} onChangeText={(v) => update('year', v)} /><CustomInput label="Placa *" placeholder="HAA-1234" autoCapitalize="characters" value={form.plate} onChangeText={(v) => update('plate', v)} /><CustomInput label="Color" placeholder="Gris" value={form.color} onChangeText={(v) => update('color', v)} /><CustomInput label="Kilometraje actual *" placeholder="185420" keyboardType="numeric" value={form.mileage} onChangeText={(v) => update('mileage', v)} />{error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}<CustomButton title="Guardar vehículo" icon="save-outline" onPress={save} /></View></ScreenWrapper>;
}
const styles = StyleSheet.create({ form: { width: '100%', borderRadius: 22, padding: 20, borderWidth: StyleSheet.hairlineWidth }, error: { fontSize: 13, marginBottom: 10 } });
