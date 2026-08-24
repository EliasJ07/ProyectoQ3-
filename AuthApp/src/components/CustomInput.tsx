import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type Props = TextInputProps & {
  type?: 'text' | 'email' | 'password';
  label?: string;
  error?: string;
};

export default function CustomInput({
  type = 'text',
  label,
  error,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const keyboardType =
    type === 'email' ? 'email-address' : 'default';

  const isPassword = type === 'password';

  const iconName =
    type === 'email'
      ? 'mail-outline'
      : type === 'password'
        ? 'lock-closed-outline'
        : 'person-outline';

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          focused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        <Ionicons
          name={iconName}
          size={21}
          color={error ? '#E53935' : focused ? '#2563EB' : '#64748B'}
          style={styles.icon}
        />

        <TextInput
          {...props}
          style={styles.input}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          placeholderTextColor="#94A3B8"
          onFocus={(event) => {
            setFocused(true);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            props.onBlur?.(event);
          }}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={21}
              color="#64748B"
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={15}
            color="#E53935"
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 7,
  },
  inputContainer: {
    height: 54,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  inputFocused: {
    borderColor: '#2563EB',
    borderWidth: 2,
  },
  inputError: {
    borderColor: '#E53935',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#1E293B',
  },
  eyeButton: {
    padding: 5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingLeft: 4,
  },
  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginLeft: 5,
  },
});