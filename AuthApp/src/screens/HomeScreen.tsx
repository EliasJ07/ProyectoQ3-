import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';
import ScreenWrapper from '../components/ScreenWrapper';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'UserTabs'>;
export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  return <ScreenWrapper><ScreenHeader icon="home-outline" title="Bienvenido" subtitle="Tu aplicación está lista" /><Card><View style={styles.cardHeader}><View style={[styles.iconContainer, { backgroundColor: colors.successSoft }]}><Ionicons name="checkmark-circle-outline" size={28} color={colors.success} /></View><View style={styles.textContainer}><Text style={[styles.cardTitle, { color: colors.text }]}>Sesión iniciada</Text><Text style={[styles.cardDescription, { color: colors.secondaryText }]}>Has iniciado sesión correctamente.</Text></View></View></Card><Card><Text style={[styles.sectionTitle, { color: colors.text }]}>Próximamente</Text><Text style={[styles.sectionDescription, { color: colors.secondaryText }]}>Aquí construiremos las funcionalidades principales de nuestra aplicación.</Text></Card><CustomButton title="Cerrar sesión" icon="log-out-outline" onPress={() => navigation.navigate('Login')} /></ScreenWrapper>;
}
const styles = StyleSheet.create({ cardHeader: { flexDirection: 'row', alignItems: 'center' }, iconContainer: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginRight: 14 }, textContainer: { flex: 1 }, cardTitle: { fontSize: 17, fontWeight: '700', marginBottom: 4 }, cardDescription: { fontSize: 14, lineHeight: 20 }, sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 }, sectionDescription: { fontSize: 14, lineHeight: 21 } });
