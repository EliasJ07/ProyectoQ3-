import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type Props = TextInputProps & {
  type?: 'text' | 'email' | 'password';
  label?: string;
  error?: string;
};

export default function CustomInput({ type = 'text', label, error, ...props }: Props) {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const keyboardType = type === 'email' ? 'email-address' : 'default';
  const isPassword = type === 'password';
  const iconName = type === 'email' ? 'mail-outline' : type === 'password' ? 'lock-closed-outline' : 'person-outline';

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.inputBackground, borderColor: colors.border },
          focused && { borderColor: colors.primary, borderWidth: 2 },
          error && { borderColor: colors.danger },
        ]}
      >
        <Ionicons
          name={iconName}
          size={21}
          color={error ? colors.danger : focused ? colors.primary : colors.secondaryText}
          style={styles.icon}
        />
        <TextInput
          {...props}
          style={[styles.input, { color: colors.text }]}
          keyboardType={props.keyboardType ?? keyboardType}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize={type === 'email' ? 'none' : props.autoCapitalize ?? 'sentences'}
          placeholderTextColor={colors.placeholder}
          onFocus={(event) => { setFocused(true); props.onFocus?.(event); }}
          onBlur={(event) => { setFocused(false); props.onBlur?.(event); }}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword((current) => !current)} style={styles.eyeButton}>
            <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={21} color={colors.secondaryText} />
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={15} color={colors.danger} />
          <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 7 },
  inputContainer: { height: 54, width: '100%', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 14, paddingHorizontal: 14 },
  icon: { marginRight: 10 },
  input: { flex: 1, height: '100%', fontSize: 16 },
  eyeButton: { padding: 5 },
  errorContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 6, paddingLeft: 4 },
  errorText: { fontSize: 12, marginLeft: 5 },
});
