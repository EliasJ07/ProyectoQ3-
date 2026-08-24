import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from '../components/ScreenWrapper';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;


export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string) => {
    setEmail(value);

    if (!value.trim()) {
      setEmailError('El correo electrónico es obligatorio');
    } else if (!value.includes('@')) {
      setEmailError('El correo debe contener @');
    } else if (!value.includes('.')) {
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

const handleLogin = () => {
  validateEmail(email);
  validatePassword(password);

  if (
    !email.trim() ||
    !email.includes('@') ||
    !email.includes('.') ||
    !password ||
    password.length < 6
  ) {
    return;
  }

  navigation.navigate('Home');
};
  return (
    <ScreenWrapper>
      <ScreenHeader
        icon="lock-closed-outline"
        title="Bienvenido"
        subtitle="Inicia sesión para continuar"
      />

      <View style={styles.form}>
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
          placeholder="Ingresa tu contraseña"
          type="password"
          value={password}
          onChangeText={validatePassword}
          error={passwordError}
        />

        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>

        <CustomButton
          title="Iniciar sesión"
          onPress={handleLogin}
          icon="arrow-forward-outline"
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerQuestion}>
            ¿No tienes una cuenta?
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerLink}>
              Regístrate
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
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: -4,
    marginBottom: 15,
  },
  forgotText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  registerQuestion: {
    fontSize: 14,
    color: '#64748B',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
    marginLeft: 5,
  },
});