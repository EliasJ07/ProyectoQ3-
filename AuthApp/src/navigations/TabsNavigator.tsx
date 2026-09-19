import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, TabName } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';
import VehiclesScreen from '../screens/vehicles/VehiclesScreen';
import RemindersScreen from '../screens/reminders/RemindersScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'UserTabs'>;

export default function TabsNavigator({ navigation }: Props) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<TabName>('vehicles');
  const renderScreen = () => activeTab === 'reminders' ? <RemindersScreen navigation={navigation} /> : activeTab === 'profile' ? <ProfileScreen navigation={navigation} /> : <VehiclesScreen navigation={navigation} />;
  const tabs: { key: TabName; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { key: 'vehicles', label: 'Vehículos', icon: 'car-outline' },
    { key: 'reminders', label: 'Recordatorios', icon: 'notifications-outline' },
    { key: 'profile', label: 'Perfil', icon: 'person-outline' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>{renderScreen()}</View>
      <View style={[styles.tabBar, { backgroundColor: colors.tabBackground, borderTopColor: colors.border }]}>
        {tabs.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <TouchableOpacity key={tab.key} style={styles.tab} onPress={() => setActiveTab(tab.key)} activeOpacity={0.8}>
              <Ionicons name={tab.icon} size={23} color={active ? colors.primary : colors.secondaryText} />
              <Text style={[styles.tabLabel, { color: active ? colors.primary : colors.secondaryText }]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  tabBar: { height: 72, borderTopWidth: 1, flexDirection: 'row', paddingBottom: 8, paddingTop: 7 },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabLabel: { fontSize: 11, fontWeight: '600', marginTop: 4 },
});
