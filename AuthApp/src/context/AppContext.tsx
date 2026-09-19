import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { supabase } from '../lib/supabase';
 
export type User = {
  id: string;
  name: string;
  email: string;
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

  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  logout: () => Promise<void>;

  addVehicle: (
    vehicle: Omit<Vehicle, 'id'>
  ) => Promise<void>;

  updateVehicle: (
    id: string,
    vehicle: Omit<Vehicle, 'id'>
  ) => Promise<void>;

  deleteVehicle: (
    id: string
  ) => Promise<void>;

  addMaintenance: (
    maintenance: Omit<Maintenance, 'id'>
  ) => Promise<void>;

  updateMaintenance: (
    id: string,
    maintenance: Omit<Maintenance, 'id'>
  ) => Promise<void>;

  deleteMaintenance: (
    id: string
  ) => Promise<void>;
};

const AppContext = createContext<AppContextValue | undefined>(
  undefined
);

export function AppProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>(
    []
  );

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, email')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error cargando perfil:', error);
      return;
    }

    if (data) {
      setUser(data);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await loadProfile(session.user.id);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password) {
      return false;
    }

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          name: normalizedName,
        },
      },
    });

    if (error) {
      console.error('Error en registro:', error.message);
      return false;
    }

    if (!data.user) {
      return false;
    }

    return true;
  };

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const normalizedEmail = email.trim().toLowerCase();

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

    //if (error) {
      //console.error('Error en login:', error.message);
      //return false;
   // }

    if (!data.user) {
      return false;
    }

    await loadProfile(data.user.id);

    return true;
  };

  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error cerrando sesión:', error.message);
      return;
    }

    setUser(null);
  };

  const addVehicle = async (
    vehicle: Omit<Vehicle, 'id'>
  ): Promise<void> => {
    setVehicles((current) => [
      ...current,
      {
        ...vehicle,
        id: Date.now().toString(),
      },
    ]);
  };

  const updateVehicle = async (
    id: string,
    vehicle: Omit<Vehicle, 'id'>
  ): Promise<void> => {
    setVehicles((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...vehicle,
              id,
            }
          : item
      )
    );
  };

  const deleteVehicle = async (
    id: string
  ): Promise<void> => {
    setVehicles((current) =>
      current.filter((item) => item.id !== id)
    );

    setMaintenances((current) =>
      current.filter((item) => item.vehicleId !== id)
    );
  };

  const addMaintenance = async (
    maintenance: Omit<Maintenance, 'id'>
  ): Promise<void> => {
    setMaintenances((current) => [
      ...current,
      {
        ...maintenance,
        id: `${Date.now()}-${Math.random()}`,
      },
    ]);
  };

  const updateMaintenance = async (
    id: string,
    maintenance: Omit<Maintenance, 'id'>
  ): Promise<void> => {
    setMaintenances((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...maintenance,
              id,
            }
          : item
      )
    );
  };

  const deleteMaintenance = async (
    id: string
  ): Promise<void> => {
    setMaintenances((current) =>
      current.filter((item) => item.id !== id)
    );
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
    [user, vehicles, maintenances]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useApp debe utilizarse dentro de AppProvider'
    );
  }

  return context;
}