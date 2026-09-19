import { View, Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleDetail'>;
export default function VehicleDetailScreen({ route, navigation }: Props) {
  const { colors } = useTheme(); const { vehicles, maintenances, deleteVehicle } = useApp(); const vehicle = vehicles.find((item) => item.id === route.params.vehicleId);
  if (!vehicle) return <ScreenWrapper><Text style={{ color: colors.text }}>Vehículo no encontrado.</Text></ScreenWrapper>;
  const count = maintenances.filter((item) => item.vehicleId === vehicle.id).length;
  const remove = () => Alert.alert('Eliminar vehículo', 'También se eliminará su historial de mantenimiento.', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Eliminar', style: 'destructive', onPress: () => { deleteVehicle(vehicle.id); navigation.popToTop(); } }]);
  return <ScreenWrapper><View style={styles.header}><Text style={[styles.title, { color: colors.text }]}>{vehicle.name}</Text><Text style={[styles.subtitle, { color: colors.secondaryText }]}>{vehicle.brand} {vehicle.model} · {vehicle.year}</Text></View><Card><Text style={[styles.section, { color: colors.text }]}>Información</Text><Text style={[styles.row, { color: colors.secondaryText }]}>Placa: <Text style={[styles.value, { color: colors.text }]}>{vehicle.plate}</Text></Text><Text style={[styles.row, { color: colors.secondaryText }]}>Color: <Text style={[styles.value, { color: colors.text }]}>{vehicle.color || 'No especificado'}</Text></Text><Text style={[styles.row, { color: colors.secondaryText }]}>Kilometraje: <Text style={[styles.value, { color: colors.text }]}>{vehicle.mileage.toLocaleString()} km</Text></Text></Card><Card><Text style={[styles.section, { color: colors.text }]}>Mantenimiento</Text><Text style={[styles.row, { color: colors.secondaryText }]}>Registros: <Text style={[styles.value, { color: colors.text }]}>{count}</Text></Text><CustomButton title="Ver historial" icon="construct-outline" onPress={() => navigation.navigate('MaintenanceHistory', { vehicleId: vehicle.id })} /></Card><CustomButton title="Editar vehículo" icon="create-outline" onPress={() => navigation.navigate('EditVehicle', { vehicleId: vehicle.id })} /><CustomButton title="Eliminar vehículo" variant="danger" icon="trash-outline" onPress={remove} /></ScreenWrapper>;
}
const styles = StyleSheet.create({ header: { marginBottom: 22 }, title: { fontSize: 28, fontWeight: '800' }, subtitle: { marginTop: 5 }, section: { fontSize: 18, fontWeight: '800', marginBottom: 12 }, row: { marginBottom: 9, fontSize: 14 }, value: { fontWeight: '700' } });
