# AutoCare

Aplicación React Native con Expo + TypeScript para gestionar vehículos, mantenimientos y recordatorios.

## Estado actual

- Context API implementado para sesión, vehículos y mantenimientos.
- Stack Navigator implementado.
- Navegación principal por pestañas implementada sin dependencia adicional.
- Registro e inicio de sesión funcionales en memoria.
- Gestión de vehículos: agregar, editar, eliminar y consultar detalle.
- Historial de mantenimiento: registrar, consultar y eliminar.
- Recordatorios calculados a partir del kilometraje del vehículo y del próximo mantenimiento.
- Perfil con estadísticas y cierre de sesión.
- Supabase todavía no está conectado.
- Redux todavía no está conectado.

## Ejecutar

```bash
npm install
npx expo start
```

## Flujo de prueba

1. Crear una cuenta.
2. Iniciar sesión con el correo y contraseña registrados.
3. Agregar un vehículo.
4. Abrir el vehículo y registrar un mantenimiento.
5. Revisar Recordatorios.
6. Revisar Perfil y cerrar sesión.

Los datos actuales se almacenan solamente en memoria y se perderán al reiniciar completamente la aplicación. La persistencia con Supabase se implementará posteriormente.
