import { Text, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import ScreenWrapper from '../../components/ScreenWrapper';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'MaintenanceDetail'>;
export default function MaintenanceDetailScreen({ route, navigation }: Props) {
  const { colors } = useTheme(); const { maintenances, deleteMaintenance } = useApp(); const item = maintenances.find((m) => m.id === route.params.maintenanceId);
  if (!item) return <ScreenWrapper><Text style={{ color: colors.text }}>Registro no encontrado.</Text></ScreenWrapper>;
  const remove = () => Alert.alert('Eliminar registro', '¿Deseas eliminar este mantenimiento?', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Eliminar', style: 'destructive', onPress: () => { deleteMaintenance(item.id); navigation.goBack(); } }]);
  return <ScreenWrapper><Text style={[styles.title, { color: colors.text }]}>{item.type}</Text><Text style={[styles.subtitle, { color: colors.secondaryText }]}>{item.date}</Text><Card><Text style={[styles.row, { color: colors.secondaryText }]}>Kilometraje: <Text style={[styles.value, { color: colors.text }]}>{item.mileage.toLocaleString()} km</Text></Text><Text style={[styles.row, { color: colors.secondaryText }]}>Costo: <Text style={[styles.value, { color: colors.text }]}>L {item.cost.toFixed(2)}</Text></Text><Text style={[styles.row, { color: colors.secondaryText }]}>Próximo: <Text style={[styles.value, { color: colors.text }]}>{item.nextMileage.toLocaleString()} km</Text></Text><Text style={[styles.notes, { color: colors.secondaryText }]}>{item.notes || 'Sin notas adicionales.'}</Text></Card><CustomButton title="Eliminar registro" variant="danger" icon="trash-outline" onPress={remove} /></ScreenWrapper>;
}
const styles = StyleSheet.create({ title: { fontSize: 28, fontWeight: '800' }, subtitle: { marginBottom: 22, marginTop: 4 }, row: { marginBottom: 12 }, value: { fontWeight: '700' }, notes: { lineHeight: 21, marginTop: 8 } });
