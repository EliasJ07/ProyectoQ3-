import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

type Props = { icon: keyof typeof Ionicons.glyphMap; title: string; subtitle: string };

export default function ScreenHeader({ icon, title, subtitle }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primarySoft }]}>
        <Ionicons name={icon} size={34} color={colors.primary} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 30 },
  iconContainer: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center', marginBottom: 18 },
  title: { fontSize: 30, fontWeight: '800', marginBottom: 8 },
  subtitle: { fontSize: 15, textAlign: 'center' },
});
