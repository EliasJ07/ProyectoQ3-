import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Vehicle = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: string;
  plate: string;
  color: string;
  mileage: number;
};

export type Maintenance = {
  id: string;
  vehicleId: string;
  type: string;
  date: string;
  mileage: number;
  cost: number;
  notes: string;
  nextMileage: number;
};

type AppContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  vehicles: Vehicle[];
  maintenances: Maintenance[];
  register: (name: string, email: string, password: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: string, vehicle: Omit<Vehicle, 'id'>) => void;
  deleteVehicle: (id: string) => void;
  addMaintenance: (maintenance: Omit<Maintenance, 'id'>) => void;
  updateMaintenance: (id: string, maintenance: Omit<Maintenance, 'id'>) => void;
  deleteMaintenance: (id: string) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);

  const register = (name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((item) => item.email === normalizedEmail)) return false;

    const newUser: User = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    setUsers((current) => [...current, newUser]);
    return true;
  };

  const login = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const foundUser = users.find(
      (item) => item.email === normalizedEmail && item.password === password
    );

    if (!foundUser) return false;
    setUser(foundUser);
    return true;
  };

  const logout = () => setUser(null);

  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    setVehicles((current) => [
      ...current,
      { ...vehicle, id: Date.now().toString() },
    ]);
  };

  const updateVehicle = (id: string, vehicle: Omit<Vehicle, 'id'>) => {
    setVehicles((current) =>
      current.map((item) => (item.id === id ? { ...vehicle, id } : item))
    );
  };

  const deleteVehicle = (id: string) => {
    setVehicles((current) => current.filter((item) => item.id !== id));
    setMaintenances((current) => current.filter((item) => item.vehicleId !== id));
  };

  const addMaintenance = (maintenance: Omit<Maintenance, 'id'>) => {
    setMaintenances((current) => [
      ...current,
      { ...maintenance, id: `${Date.now()}-${Math.random()}` },
    ]);
  };

  const updateMaintenance = (id: string, maintenance: Omit<Maintenance, 'id'>) => {
    setMaintenances((current) =>
      current.map((item) => (item.id === id ? { ...maintenance, id } : item))
    );
  };

  const deleteMaintenance = (id: string) => {
    setMaintenances((current) => current.filter((item) => item.id !== id));
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      vehicles,
      maintenances,
      register,
      login,
      logout,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      addMaintenance,
      updateMaintenance,
      deleteMaintenance,
    }),
    [user, vehicles, maintenances, users]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp debe utilizarse dentro de AppProvider');
  return context;
}
