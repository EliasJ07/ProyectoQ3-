import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from '../components/ScreenWrapper';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateName = (value: string) => {
    setName(value);

    if (!value.trim()) {
      setNameError('El nombre es obligatorio');
    } else {
      setNameError('');
    }
  };

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

    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validateConfirmPassword = (value: string) => {
    setConfirmPassword(value);

    if (!value) {
      setConfirmPasswordError('Confirma tu contraseña');
    } else if (value !== password) {
      setConfirmPasswordError('Las contraseñas no coinciden');
    } else {
      setConfirmPasswordError('');
    }
  };

const handleRegister = () => {
  const isNameValid = name.trim() !== '';

  const isEmailValid =
    email.trim() !== '' &&
    email.includes('@') &&
    email.includes('.');

  const isPasswordValid =
    password !== '' &&
    password.length >= 6;

  const isConfirmPasswordValid =
    confirmPassword !== '' &&
    confirmPassword === password;

  validateName(name);
  validateEmail(email);
  validatePassword(password);
  validateConfirmPassword(confirmPassword);

  if (
    !isNameValid ||
    !isEmailValid ||
    !isPasswordValid ||
    !isConfirmPasswordValid
  ) {
    return;
  }

  Alert.alert(
    'Registro exitoso',
    'Tu cuenta ha sido creada correctamente.',
    [
      {
        text: 'Continuar',
        onPress: () => navigation.navigate('Login'),
      },
    ]
  );
};

  return (
    <ScreenWrapper>
      <ScreenHeader
        icon="person-add-outline"
        title="Crear cuenta"
        subtitle="Regístrate para comenzar"
      />

      <View style={styles.form}>
        <CustomInput
          label="Nombre"
          placeholder="Ingresa tu nombre"
          type="text"
          value={name}
          onChangeText={validateName}
          error={nameError}
        />

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

        <CustomInput
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          type="password"
          value={confirmPassword}
          onChangeText={validateConfirmPassword}
          error={confirmPasswordError}
        />

        <CustomButton
          title="Crear cuenta"
          onPress={handleRegister}
          icon="arrow-forward-outline"
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginQuestion}>
            ¿Ya tienes una cuenta?
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginLink}>
              Inicia sesión
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  loginQuestion: {
    fontSize: 14,
    color: '#64748B',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
    marginLeft: 5,
  },
});