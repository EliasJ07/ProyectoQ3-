export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserTabs: undefined;
  VehicleDetail: { vehicleId: string };
  AddVehicle: undefined;
  EditVehicle: { vehicleId: string };
  MaintenanceHistory: { vehicleId: string };
  AddMaintenance: { vehicleId: string };
  MaintenanceDetail: { vehicleId: string; maintenanceId: string };
  ReminderDetail: { vehicleId: string; maintenanceId: string };
};

export type TabName = 'vehicles' | 'reminders' | 'profile';
