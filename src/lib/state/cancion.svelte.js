
const cancionGuardada =
    typeof window !== 'undefined'
        ? localStorage.getItem('aura_current_song')
        : null;

let cancionInicial = null;

try {
    cancionInicial = cancionGuardada
        ? JSON.parse(cancionGuardada)
        : null;
} catch (error) {
    console.error('No se pudo recuperar la canción guardada:', error);
}

export const estadocancion = $state({
    actual: cancionInicial
});

export const actualizarCancion = (nuevacancion) => {
    estadocancion.actual = nuevacancion;

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
