import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from '../components/ScreenWrapper';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { register } = useApp();
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirm: '' });
  const handleRegister = () => {
    const next = { name: name.trim() ? '' : 'El nombre es obligatorio', email: !email.trim() ? 'El correo electrónico es obligatorio' : !email.includes('@') || !email.includes('.') ? 'Ingresa un correo válido' : '', password: password.length < 6 ? 'La contraseña debe tener al menos 6 caracteres' : '', confirm: confirmPassword !== password ? 'Las contraseñas no coinciden' : '' };
    setErrors(next); if (Object.values(next).some(Boolean)) return;
    if (!register(name, email, password)) { setErrors((current) => ({ ...current, email: 'Este correo ya está registrado' })); return; }
    Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada correctamente.', [{ text: 'Continuar', onPress: () => navigation.replace('Login') }]);
  };
  return (
    <ScreenWrapper>
      <ScreenHeader icon="person-add-outline" title="Crear cuenta" subtitle="Comienza a cuidar tus vehículos" />
      <View style={[styles.form, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <CustomInput label="Nombre" placeholder="Ingresa tu nombre" type="text" value={name} onChangeText={setName} error={errors.name} />
        <CustomInput label="Correo electrónico" placeholder="ejemplo@correo.com" type="email" value={email} onChangeText={setEmail} error={errors.email} />
        <CustomInput label="Contraseña" placeholder="Mínimo 6 caracteres" type="password" value={password} onChangeText={setPassword} error={errors.password} />
        <CustomInput label="Confirmar contraseña" placeholder="Repite tu contraseña" type="password" value={confirmPassword} onChangeText={setConfirmPassword} error={errors.confirm} />
        <CustomButton title="Crear cuenta" onPress={handleRegister} icon="checkmark-outline" />
        <View style={styles.loginContainer}>
          <Text style={[styles.question, { color: colors.secondaryText }]}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')}><Text style={[styles.link, { color: colors.primary }]}>Inicia sesión</Text></TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  form: { width: '100%', 
    borderRadius: 22, 
    padding: 22, 
    borderWidth: StyleSheet.hairlineWidth, 
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 12, 
    elevation: 4 },
  loginContainer: { flexDirection: 'row', 
    justifyContent: 'center',
     alignItems: 'center', 
     marginTop: 22 },
  question: { fontSize: 14, marginRight: 5 },
  link: { fontSize: 14, fontWeight: '700' },
});
