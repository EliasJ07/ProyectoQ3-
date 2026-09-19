import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: ButtonVariant;
  style?: ViewStyle;
};

export default function CustomButton({ title, onPress, loading = false, disabled = false, icon, variant = 'primary', style }: Props) {
  const { colors } = useTheme();
  const inactive = disabled || loading;
  const backgroundColor = variant === 'secondary' ? colors.surface : variant === 'danger' ? colors.danger : variant === 'outline' ? 'transparent' : colors.primary;
  const textColor = variant === 'secondary' ? colors.text : variant === 'danger' || variant === 'primary' ? '#FFFFFF' : colors.primary;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, borderColor: variant === 'outline' ? colors.primary : 'transparent', opacity: inactive ? 0.6 : 1 }, style]}
      onPress={onPress}
      disabled={inactive}
      activeOpacity={0.8}
    >
      {loading ? <ActivityIndicator color={textColor} /> : <>
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        {icon && <Ionicons name={icon} size={19} color={textColor} style={styles.icon} />}
      </>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { width: '100%', minHeight: 54, borderRadius: 14, borderWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 5, paddingHorizontal: 18 },
  text: { fontSize: 16, fontWeight: '700' },
  icon: { marginLeft: 8 },
});
