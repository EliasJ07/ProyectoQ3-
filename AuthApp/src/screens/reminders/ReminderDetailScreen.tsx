import { Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ReminderDetail'>;
export default function ReminderDetailScreen({ route, navigation }: Props) {
  const { colors } = useTheme(); const { vehicles, maintenances } = useApp(); const vehicle = vehicles.find((v) => v.id === route.params.vehicleId); const item = maintenances.find((m) => m.id === route.params.maintenanceId);
  if (!item || !vehicle) return <ScreenWrapper><Text style={{ color: colors.text }}>Recordatorio no encontrado.</Text></ScreenWrapper>;
  const remaining = item.nextMileage - vehicle.mileage; const overdue = remaining <= 0;
  return <ScreenWrapper><Text style={[styles.title, { color: colors.text }]}>{item.type}</Text><Text style={[styles.subtitle, { color: colors.secondaryText }]}>{vehicle.name}</Text><Card><Text style={[styles.label, { color: colors.secondaryText }]}>Estado</Text><Text style={[styles.status, { color: overdue ? colors.danger : colors.warning }]}>{overdue ? '🔴 Pendiente' : '🟡 Próximo'}</Text><Text style={[styles.row, { color: colors.secondaryText }]}>Kilometraje actual: <Text style={[styles.value, { color: colors.text }]}>{vehicle.mileage.toLocaleString()} km</Text></Text><Text style={[styles.row, { color: colors.secondaryText }]}>Programado: <Text style={[styles.value, { color: colors.text }]}>{item.nextMileage.toLocaleString()} km</Text></Text><Text style={[styles.message, { color: colors.secondaryText }]}>{overdue ? `El mantenimiento está pendiente por ${Math.abs(remaining).toLocaleString()} km.` : `Faltan ${remaining.toLocaleString()} km para el mantenimiento.`}</Text></Card><CustomButton title="Ver mantenimiento" icon="construct-outline" onPress={() => navigation.navigate('MaintenanceDetail', { vehicleId: item.vehicleId, maintenanceId: item.id })} /></ScreenWrapper>;
}
const styles = StyleSheet.create({ title: { fontSize: 28, fontWeight: '800' }, subtitle: { marginTop: 4, marginBottom: 22 }, label: { fontSize: 13, fontWeight: '700' }, status: { fontSize: 17, fontWeight: '800', marginVertical: 9 }, row: { marginTop: 8 }, value: { fontWeight: '700' }, message: { lineHeight: 21, marginTop: 18 } });
