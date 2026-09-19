import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from '../components/ScreenWrapper';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string) => {
    setEmail(value);

    if (!value.trim()) {
      setEmailError('El correo electrónico es obligatorio');
    } else if (!value.includes('@') || !value.includes('.')) {
      setEmailError('Ingresa un correo válido');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (value: string) => {
    setPassword(value);

    if (!value) {
      setPasswordError('La contraseña es obligatoria');
    } else if (value.length < 6) {
      setPasswordError(
        'La contraseña debe tener al menos 6 caracteres'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    validateEmail(email);
    validatePassword(password);

    const valid =
      email.trim() !== '' &&
      email.includes('@') &&
      email.includes('.') &&
      password.length >= 6;

    if (!valid) {
      return;
    }

    const success = await login(email, password);

    if (!success) {
      Alert.alert(
        'Inicio de sesión',
        'El correo o la contraseña no son correctos.'
      );
      return;
    }

    navigation.replace('UserTabs');
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        icon="lock-closed-outline"
        title="AutoCare"
        subtitle="Ingresa para cuidar tu vehículo"
      />

      <View
        style={[
          styles.form,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <CustomInput
          label="Correo electrónico"
          placeholder="ejemplo@correo.com"
          type="email"
          value={email}
          onChangeText={validateEmail}
          error={emailError}
        />

        <CustomInput
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          type="password"
          value={password}
          onChangeText={validatePassword}
          error={passwordError}
        />

        <CustomButton
          title="Iniciar sesión"
          onPress={handleLogin}
          icon="arrow-forward-outline"
        />

        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              'Próximamente',
              'La recuperación de contraseña se conectará con Supabase en la etapa final.'
            )
          }
          style={styles.forgot}
        >
          <Text
            style={[
              styles.link,
              { color: colors.primary },
            ]}
          >
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text
            style={[
              styles.question,
              { color: colors.secondaryText },
            ]}
          >
            ¿No tienes una cuenta?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Register')
            }
          >
            <Text
              style={[
                styles.link,
                { color: colors.primary },
              ]}
            >
              Crear cuenta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    borderRadius: 22,
    padding: 22,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  forgot: {
    alignSelf: 'flex-end',
    marginTop: 14,
  },

  link: {
    fontSize: 13,
    fontWeight: '700',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  question: {
    fontSize: 14,
    marginRight: 5,
  },
});