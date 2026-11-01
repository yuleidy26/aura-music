// lib/state/cancion.svelte.js
const cancionGuardada =
    typeof window !== 'undefined'
        ? localStorage.getItem('aura_current_song')
        : null;

let cancionInicial = null;

try {
    cancionInicial = cancionGuardada ? JSON.parse(cancionGuardada) : null;
} catch (error) {
    console.error('No se pudo recuperar la canción guardada:', error);
}

export const estadocancion = $state({
    actual: cancionInicial,
    reproduciendo: false // Estado de reproducción
});

export const actualizarCancion = (nuevacancion) => {
    estadocancion.actual = nuevacancion;
    estadocancion.reproduciendo = true; // Iniciar reproducción automáticamente al seleccionar

    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(
                'aura_current_song',
                JSON.stringify(nuevacancion)
            );
        } catch (error) {
            console.error('No se pudo guardar la canción:', error);
        }
    }
};

export const alternarReproduccion = () => {
    estadocancion.reproduciendo = !estadocancion.reproduciendo;
};