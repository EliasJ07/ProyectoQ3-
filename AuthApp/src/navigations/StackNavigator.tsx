import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabsNavigator from './TabsNavigator';
import VehicleDetailScreen from '../screens/vehicles/VehicleDetailScreen';
import AddVehicleScreen from '../screens/vehicles/AddVehicleScreen';
import MaintenanceHistoryScreen from '../screens/maintenance/MaintenanceHistoryScreen';
import AddMaintenanceScreen from '../screens/maintenance/AddMaintenanceScreen';
import MaintenanceDetailScreen from '../screens/maintenance/MaintenanceDetailScreen';
import ReminderDetailScreen from '../screens/reminders/ReminderDetailScreen';
import EditVehicleScreen from '../screens/vehicles/EditVehicleScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="UserTabs" component={TabsNavigator} />
      <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
      <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
      <Stack.Screen name="EditVehicle" component={EditVehicleScreen} />
      <Stack.Screen name="MaintenanceHistory" component={MaintenanceHistoryScreen} />
      <Stack.Screen name="AddMaintenance" component={AddMaintenanceScreen} />
      <Stack.Screen name="MaintenanceDetail" component={MaintenanceDetailScreen} />
      <Stack.Screen name="ReminderDetail" component={ReminderDetailScreen} />
    </Stack.Navigator>
  );
}
