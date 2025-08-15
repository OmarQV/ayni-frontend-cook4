/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#059669',    // Verde esmeralda (naturaleza)
                secondary: '#0891b2',  // Azul océano
                accent: '#f59e0b',     // Amarillo dorado (sol/arena)
                
                // Colores adicionales para turismo
                nature: {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    500: '#059669',
                    600: '#047857',
                    700: '#065f46',
                    900: '#064e3b',
                },
                ocean: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0891b2',
                    600: '#0e7490',
                    700: '#0f766e',
                    900: '#134e4a',
                },
                sunset: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    900: '#78350f',
                }
            }
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                tourism: {
                    "primary": "#059669",      // Verde esmeralda
                    "secondary": "#0891b2",    // Azul océano
                    "accent": "#f59e0b",       // Amarillo dorado
                    "neutral": "#374151",      // Gris neutro
                    "base-100": "#ffffff",     // Blanco base
                    "base-200": "#f9fafb",     // Gris muy claro
                    "base-300": "#f3f4f6",     // Gris claro
                    "info": "#0ea5e9",         // Azul info
                    "success": "#10b981",      // Verde éxito
                    "warning": "#f59e0b",      // Amarillo advertencia
                    "error": "#ef4444",        // Rojo error
                },
            },
            "dark",
            "light"
        ],
    },
}