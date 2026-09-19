import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'MaintenanceHistory'>;
export default function MaintenanceHistoryScreen({ route, navigation }: Props) {
  const { colors } = useTheme(); const { vehicles, maintenances } = useApp(); const vehicle = vehicles.find((item) => item.id === route.params.vehicleId); const items = maintenances.filter((item) => item.vehicleId === route.params.vehicleId).sort((a, b) => b.date.localeCompare(a.date));
  return <ScreenWrapper><View style={styles.header}><Text style={[styles.title, { color: colors.text }]}>Historial</Text><Text style={[styles.subtitle, { color: colors.secondaryText }]}>{vehicle?.name || 'Vehículo'}</Text></View>{items.length === 0 ? <Card><Text style={[styles.empty, { color: colors.secondaryText }]}>Todavía no hay mantenimientos registrados.</Text></Card> : items.map((item) => <TouchableOpacity key={item.id} onPress={() => navigation.navigate('MaintenanceDetail', { vehicleId: item.vehicleId, maintenanceId: item.id })}><Card><View style={styles.row}><View style={[styles.icon, { backgroundColor: colors.primarySoft }]}><Ionicons name="construct-outline" size={24} color={colors.primary} /></View><View style={styles.info}><Text style={[styles.type, { color: colors.text }]}>{item.type}</Text><Text style={[styles.data, { color: colors.secondaryText }]}>{item.date} · {item.mileage.toLocaleString()} km</Text><Text style={[styles.cost, { color: colors.primary }]}>L {item.cost.toFixed(2)}</Text></View><Ionicons name="chevron-forward" size={20} color={colors.placeholder} /></View></Card></TouchableOpacity>)}<CustomButton title="Registrar mantenimiento" icon="add-outline" onPress={() => navigation.navigate('AddMaintenance', { vehicleId: route.params.vehicleId })} /></ScreenWrapper>;
}
const styles = StyleSheet.create({ header: { marginBottom: 22 }, title: { fontSize: 28, fontWeight: '800' }, subtitle: { marginTop: 4 }, empty: { textAlign: 'center' }, row: { flexDirection: 'row', alignItems: 'center' }, icon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 12 }, info: { flex: 1 }, type: { fontSize: 16, fontWeight: '800' }, data: { fontSize: 13, marginTop: 3 }, cost: { fontSize: 13, fontWeight: '700', marginTop: 4 } });
