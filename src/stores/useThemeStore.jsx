// stores/useThemeStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
    //persist nos permite guardar el estado en localStorage
    persist(
        (set) => ({
            // Valor inicial
            mode: 'light',
            //Función para cambiar el modo
            setMode: () => set((state) => ({
                //state es el estado actual y verifica si es light o dark para cambiarlo
                mode: state.mode === 'light' ? 'dark' : 'light'
            })),
        }),
        {
            // Nombre para guardar en localStorage
            name: 'theme-storage',
        }
    )
);

export default useThemeStore;
