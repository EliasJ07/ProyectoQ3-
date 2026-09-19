import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';

type Props = { children: ReactNode; style?: StyleProp<ViewStyle> };

export default function Card({ children, style }: Props) {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
});
