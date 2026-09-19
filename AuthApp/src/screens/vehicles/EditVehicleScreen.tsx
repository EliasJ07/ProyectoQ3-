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

type Props = NativeStackScreenProps<RootStackParamList, 'EditVehicle'>;
export default function EditVehicleScreen({ route, navigation }: Props) {
  const { colors } = useTheme(); const { vehicles, updateVehicle } = useApp(); const vehicle = vehicles.find((item) => item.id === route.params.vehicleId);
  const [form, setForm] = useState(vehicle ? { ...vehicle, mileage: String(vehicle.mileage) } : { name: '', brand: '', model: '', year: '', plate: '', color: '', mileage: '' });
  if (!vehicle) return <ScreenWrapper><Text style={[styles.notFound, { color: colors.text }]}>Vehículo no encontrado.</Text></ScreenWrapper>;
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const save = () => { const mileage = Number(form.mileage); if (!form.name || !form.brand || !form.model || !form.year || !form.plate || !Number.isFinite(mileage)) return; updateVehicle(vehicle.id, { name: form.name, brand: form.brand, model: form.model, year: form.year, plate: form.plate, color: form.color, mileage }); Alert.alert('Actualizado', 'Los datos del vehículo fueron actualizados.', [{ text: 'Continuar', onPress: () => navigation.goBack() }]); };
  return <ScreenWrapper><ScreenHeader icon="create-outline" title="Editar vehículo" subtitle="Actualiza los datos del vehículo" /><View style={[styles.form, { backgroundColor: colors.surface, borderColor: colors.border }]}><CustomInput label="Nombre" value={form.name} onChangeText={(v) => update('name', v)} /><CustomInput label="Marca" value={form.brand} onChangeText={(v) => update('brand', v)} /><CustomInput label="Modelo" value={form.model} onChangeText={(v) => update('model', v)} /><CustomInput label="Año" value={form.year} onChangeText={(v) => update('year', v)} keyboardType="numeric" /><CustomInput label="Placa" value={form.plate} onChangeText={(v) => update('plate', v)} /><CustomInput label="Color" value={form.color} onChangeText={(v) => update('color', v)} /><CustomInput label="Kilometraje" value={form.mileage} onChangeText={(v) => update('mileage', v)} keyboardType="numeric" /><CustomButton title="Guardar cambios" icon="save-outline" onPress={save} /></View></ScreenWrapper>;
}
const styles = StyleSheet.create({ form: { borderRadius: 22, padding: 20, borderWidth: StyleSheet.hairlineWidth }, notFound: { fontSize: 18, textAlign: 'center' } });
