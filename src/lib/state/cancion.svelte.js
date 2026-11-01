// ... (lo que ya tienes arriba en cancion.svelte.js)

export const estadocancion = $state({
    actual: cancionInicial,
    reproduciendo: false,
    lista: [],        // Guardaremos todas las canciones de la API aquí
    aleatorio: false,
    repetir: false
});

// Función para guardar la lista completa que viene de la API
export const establecerLista = (tracks) => {
    estadocancion.lista = tracks;
};

export const actualizarCancion = (nuevacancion) => {
    estadocancion.actual = nuevacancion;
    estadocancion.reproduciendo = true;

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

// Ir a la canción siguiente
export const cancionSiguiente = () => {
    if (!estadocancion.lista.length || !estadocancion.actual) return;
    
    const indexActual = estadocancion.lista.findIndex(t => t.id === estadocancion.actual.id);
    
    if (estadocancion.aleatorio) {
        // Elegir una canción al azar que no sea la misma actual
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * estadocancion.lista.length);
        } while (randomIndex === indexActual && estadocancion.lista.length > 1);
        actualizarCancion(estadocancion.lista[randomIndex]);
    } else {
        // Siguiente en orden, si llega al final vuelve a la primera (bucle)
        const siguienteIndex = (indexActual + 1) % estadocancion.lista.length;
        actualizarCancion(estadocancion.lista[siguienteIndex]);
    }
};

// Ir a la canción anterior
export const cancionAnterior = () => {
    if (!estadocancion.lista.length || !estadocancion.actual) return;
    
    const indexActual = estadocancion.lista.findIndex(t => t.id === estadocancion.actual.id);
    const anteriorIndex = (indexActual - 1 + estadocancion.lista.length) % estadocancion.lista.length;
    actualizarCancion(estadocancion.lista[anteriorIndex]);
};

// Alternar modo Aleatorio
export const alternarAleatorio = () => {
    estadocancion.aleatorio = !estadocancion.aleatorio;
};

// Alternar modo Repetir
export const alternarRepetir = () => {
    estadocancion.repetir = !estadocancion.repetir;
};