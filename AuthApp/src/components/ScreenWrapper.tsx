import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';

type Props = { children: ReactNode; scroll?: boolean };

export default function ScreenWrapper({ children, scroll = true }: Props) {
  const { colors } = useTheme();
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={styles.content}>{children}</View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {content}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 35 },
  content: { flex: 1, paddingHorizontal: 24, paddingVertical: 35 },
});
