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
    reproduciendo: false,
    lista: [],          // Almacenará todas las canciones de la API
    indiceActual: 0,    // Posición actual en la lista
    aleatorio: false,   // Estado de reproducción aleatoria
    bucle: false        // Estado de repetición
});

export const inicializarLista = (tracks) => {
    estadocancion.lista = tracks;
    if (estadocancion.actual) {
        const index = tracks.findIndex(t => t.id === estadocancion.actual.id);
        if (index !== -1) estadocancion.indiceActual = index;
    }
};

export const actualizarCancion = (nuevacancion) => {
    estadocancion.actual = nuevacancion;
    estadocancion.reproduciendo = true;

    const index = estadocancion.lista.findIndex(t => t.id === nuevacancion.id);
    if (index !== -1) {
        estadocancion.indiceActual = index;
    }

    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('aura_current_song', JSON.stringify(nuevacancion));
        } catch (error) {
            console.error('No se pudo guardar la canción:', error);
        }
    }
};

export const alternarReproduccion = () => {
    estadocancion.reproduciendo = !estadocancion.reproduciendo;
};

export const alternarAleatorio = () => {
    estadocancion.aleatorio = !estadocancion.aleatorio;
};

export const alternarBucle = () => {
    estadocancion.bucle = !estadocancion.bucle;
};

export const siguienteCancion = () => {
    if (estadocancion.lista.length === 0) return;

    if (estadocancion.aleatorio) {
        let nuevoIndice;
        do {
            nuevoIndice = Math.floor(Math.random() * estadocancion.lista.length);
        } while (nuevoIndice === estadocancion.indiceActual && estadocancion.lista.length > 1);
        estadocancion.indiceActual = nuevoIndice;
    } else {
        estadocancion.indiceActual = (estadocancion.indiceActual + 1) % estadocancion.lista.length;
    }
    actualizarCancion(estadocancion.lista[estadocancion.indiceActual]);
};

export const anteriorCancion = () => {
    if (estadocancion.lista.length === 0) return;

    estadocancion.indiceActual = (estadocancion.indiceActual - 1 + estadocancion.lista.length) % estadocancion.lista.length;
    actualizarCancion(estadocancion.lista[estadocancion.indiceActual]);
};