import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import ScreenWrapper from '../components/ScreenWrapper';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScreenWrapper scroll={true}>
      <ScreenHeader
        icon="home-outline"
        title="Bienvenido"
        subtitle="Tu aplicación está lista"
      />

      <Card>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="checkmark-circle-outline"
              size={28}
              color="#16A34A"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>
              Sesión iniciada
            </Text>

            <Text style={styles.cardDescription}>
              Has iniciado sesión correctamente.
            </Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>
          Próximamente
        </Text>

        <Text style={styles.sectionDescription}>
          Aquí construiremos las funcionalidades principales
          de nuestra aplicación.
        </Text>
      </Card>

      <CustomButton
        title="Cerrar sesión"
        icon="log-out-outline"
        onPress={() => navigation.navigate('Login')}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 21,
  },
});