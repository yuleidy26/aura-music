<script>
    import Cancion from "#lib/components/Cancion.svelte";
    import {
        estadocancion,
        alternarReproduccion,
        actualizarCancion
    } from "#lib/state/cancion.svelte.js";
    import Icon from "@iconify/svelte";
    import axios from "axios";

    // Lista de canciones
    let listaCanciones = $state([]);

    const respuestacancion = axios.get(
        "https://leonardoapi.vercel.app/api/tracks"
    ).then((respuesta) => {
        listaCanciones = respuesta.data.tracks;
        console.log(listaCanciones[0]);
        return respuesta;;
    });

    // Variables de control de audio
    let elementoAudio = $state(null);
    let tiempoActual = $state(0);
    let duracionTotal = $state(0);

    // Modos del reproductor
    let aleatorio = $state(false);
    let repetir = $state(false);

    // Formatear segundos a mm:ss
    function formatearTiempo(segundos) {
        if (isNaN(segundos) || segundos === 0) return "00:00";

        const minutos = Math.floor(segundos / 60);
        const segsRestantes = Math.floor(segundos % 60);

        return `${minutos.toString().padStart(2, '0')}:${segsRestantes.toString().padStart(2, '0')}`;
    }

    // Sincronizar reproducción con el audio
    $effect(() => {
        if (!elementoAudio || !estadocancion.actual) return;

        if (estadocancion.reproduciendo) {
            elementoAudio.play().catch((error) => {
                console.error("No se pudo reproducir el audio:", error);
                estadocancion.reproduciendo = false;
            });
        } else {
            elementoAudio.pause();
        }
    });

    // Mover barra de tiempo
    function cambiarTiempo(evento) {
        const nuevoTiempo = parseFloat(evento.target.value);

        if (elementoAudio) {
            elementoAudio.currentTime = nuevoTiempo;
            tiempoActual = nuevoTiempo;
        }
    }

    // Buscar posición de la canción actual
    function obtenerIndiceActual() {
        return listaCanciones.findIndex(
            (cancion) => cancion.id === estadocancion.actual?.id
        );
    }

    // Siguiente canción
    function siguienteCancion() {
        if (listaCanciones.length === 0) return;

        let indice = obtenerIndiceActual();

        if (aleatorio && listaCanciones.length > 1) {
            let nuevoIndice;

            do {
                nuevoIndice = Math.floor(Math.random() * listaCanciones.length);
            } while (nuevoIndice === indice);

            indice = nuevoIndice;
        } else {
            indice = (indice + 1) % listaCanciones.length;
        }

        actualizarCancion(listaCanciones[indice]);
    }

    // Canción anterior
    function anteriorCancion() {
        if (listaCanciones.length === 0) return;

        if (elementoAudio && tiempoActual > 3) {
            elementoAudio.currentTime = 0;
            tiempoActual = 0;
            return;
        }

        const indice = obtenerIndiceActual();
        const anterior = (indice - 1 + listaCanciones.length) % listaCanciones.length;

        actualizarCancion(listaCanciones[anterior]);
    }

    // Activar o desactivar aleatorio
    function alternarAleatorio() {
        aleatorio = !aleatorio;
    }

    // Activar o desactivar repetición
    function alternarBucle() {
        repetir = !repetir;
    }

    // Qué sucede al terminar una canción
    function alTerminar() {
        if (repetir) {
            elementoAudio.currentTime = 0;
            elementoAudio.play();
            return;
        }

        if (obtenerIndiceActual() < listaCanciones.length - 1) {
            siguienteCancion();
        } else {
            estadocancion.reproduciendo = false;
        }
    }
</script>

<!-- Etiqueta Audio invisible conectada a los datos de la API -->
{#if estadocancion.actual}
    <audio
        bind:this={elementoAudio}
        src={estadocancion.actual.audio}
        bind:currentTime={tiempoActual}
        bind:duration={duracionTotal}
        onended={alTerminar}
        autoplay
    ></audio>
{/if}
<section class="min-h-screen w-full overflow-x-hidden bg-[#EDF1FD]">
    <main class="flex flex-col desk:flex-row items-center desk:items-start justify-center gap-6 desk:gap-7 p-3 sm:p-7">
        <!-- reproductor de musica -->

        {#if estadocancion.actual}
        <div class="w-full max-w-[600px] desk:w-[600px] desk:max-w-none shrink-0 bg-white flex flex-col gap-5 sm:gap-6 rounded-[40px] p-4 sm:p-9 shadow-sm">
            <!-- album -->
            <div class="w-full flex justify-center">
                <img
                    src={estadocancion.actual.album.image}
                    alt="Portada del álbum"
                    class="w-full max-w-[390px] aspect-square object-cover rounded-3xl"
                />
            </div>

            <!-- Información y controles -->
            <div class="w-full flex flex-col gap-4">
                <div class="flex flex-col min-w-0">
                    <h2 class="font-bold text-xl break-words">{estadocancion.actual.title}</h2>
                    <p class="text-xs text-[#4A4550] break-words">{estadocancion.actual.artist.name}</p>
                </div>

                <!-- Barra de progreso -->
                <div class="flex flex-col gap-2 w-full">
                    <input
                        type="range"
                        min="0"
                        max={duracionTotal || 100}
                        value={tiempoActual}
                        oninput={cambiarTiempo}
                        class="w-full accent-pink-400 cursor-pointer"
                    />
                    <div class="flex justify-between">
                        <span class="text-[#7B7582] text-xs">{formatearTiempo(tiempoActual)}</span>
                        <span class="text-[#7B7582] text-xs">{formatearTiempo(duracionTotal)}</span>
                    </div>
                </div>

                <div class="flex flex-nowrap justify-center items-center gap-2 sm:gap-5 mt-4">
                    <!-- Aleatorio -->
                     <button
                     onclick={alternarAleatorio}
                     class={`rounded-full p-2.5 sm:p-3 transition-colors ${aleatorio ? 'bg-[#F8A5C2] text-[#68134A]' : 'text-[#85808C] hover:bg-[#F5F2EE]'}`}
                     >
                     <Icon icon="lucide:shuffle" width="20" />
                    </button>
                    
                    <!-- Canción anterior -->
                     <button
                     onclick={anteriorCancion}
                     class="rounded-full bg-[#F5F2EE] p-2.5 sm:p-3 text-[#242124] hover:bg-[#EAE5E0] transition-colors"
                     >
                     <Icon icon="lucide:skip-back" width="20" />
                    </button>

                    <!-- Botón Reproducir / Pausar -->
                    <button
                        onclick={alternarReproduccion}
                        class="rounded-full bg-[#FF9FC3] p-4 sm:p-5 text-[#68134A] shadow-lg shadow-pink-200 hover:bg-[#FF8DB8] transition-colors"
                    >
                        {#if estadocancion.reproduciendo}
                            <Icon icon="lucide:pause" width="24" />
                        {:else}
                            <Icon icon="lucide:play" width="24" />
                        {/if}
                    </button>

                    <!-- Canción siguiente -->
                     <button
                     onclick={siguienteCancion}
                     class="rounded-full bg-[#F5F2EE] p-2.5 sm:p-3 text-[#242124] hover:bg-[#EAE5E0] transition-colors"
                     >
                     <Icon icon="lucide:skip-forward" width="20" />
                    </button>

                    <!-- Repetir -->
                     <button
                     onclick={alternarBucle}
                     class={`rounded-full p-2.5 sm:p-3 transition-colors ${repetir ? 'bg-[#F8A5C2] text-[#68134A]' : 'text-[#85808C] hover:bg-[#F5F2EE]'}`}
                     >
                     <Icon icon="lucide:repeat" width="20" />
                    </button>
                </div>
            </div>
        </div>
        
        {:else}
        <div class="w-full max-w-[600px] desk:w-[600px] desk:max-w-none shrink-0 bg-white flex flex-col gap-5 sm:gap-6 rounded-[40px] p-4 sm:p-9 shadow-sm">

        <!-- Portada provisional -->
        <div class="w-full flex justify-center">
            <div class="w-full max-w-[390px] aspect-square rounded-3xl bg-[#EDF1FD] flex flex-col items-center justify-center gap-4">
                <Icon icon="lucide:music-2" width="90" height="90" class="text-[#F8A5C2]" />
                <span class="text-[#7B7582] text-sm font-bold tracking-widest">
                    AURA MUSIC
                </span>
            </div>
        </div>

        <!-- Información de bienvenida -->
        <div class="w-full min-w-0 flex flex-col gap-4">

            <div class="flex flex-col min-w-0">
                <h2 class="font-bold text-xl text-[#4A4550] break-words">
                    ¡Bienvenido a Aura Music!
                </h2>
                <p class="text-xs text-[#7B7582] break-words">
                    Selecciona una canción para comenzar
                </p>
            </div>

            <!-- Barra de progreso -->
            <div class="flex flex-col gap-2 w-full">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value="0"
                    disabled
                    class="w-full accent-pink-400"
                />
                <div class="flex justify-between">
                    <span class="text-[#7B7582] text-xs">00:00</span>
                    <span class="text-[#7B7582] text-xs">00:00</span>
                </div>
            </div>

            <!-- Botones decorativos -->
            <div class="flex flex-nowrap justify-center items-center gap-2 sm:gap-5 mt-4">

                <div class="rounded-full p-2.5 sm:p-3 text-[#85808C]">
                    <Icon icon="lucide:shuffle" width="20" />
                </div>

                <div class="rounded-full bg-[#F5F2EE] p-2.5 sm:p-3 text-[#242124]">
                    <Icon icon="lucide:skip-back" width="20" />
                </div>

                <div class="rounded-full bg-[#FF9FC3] p-4 sm:p-5 text-[#68134A] shadow-lg shadow-pink-200">
                    <Icon icon="lucide:play" width="24" />
                </div>

                <div class="rounded-full bg-[#F5F2EE] p-2.5 sm:p-3 text-[#242124]">
                    <Icon icon="lucide:skip-forward" width="20" />
                </div>

                <div class="rounded-full p-2.5 sm:p-3 text-[#85808C]">
                    <Icon icon="lucide:repeat" width="20" />
                </div>

            </div>
        </div>
    </div>
{/if}


        <!-- lista de reproduccion -->
        <div class="w-full max-w-[600px] desk:w-[420px] desk:max-w-none shrink-0 bg-white flex flex-col gap-6 rounded-[40px] p-4 sm:p-9 shadow-sm">
            <div class="flex items-center justify-between w-full min-w-0">
                <div class="min-w-0">
                    <h2 class="font-bold text-xl break-words">Lista de Reproducción</h2>
                    <p class="text-[#7B7582] text-xs">13 canciones • 1 h 06 min</p>
                </div>
            </div>

            <div class="flex flex-col gap-3 w-full">
                {#await respuestacancion}
                    <div class="flex justify-center items-center py-4">
                        <div class="w-6 h-6 border-4 border-[#F8A5C2] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                {:then respuestalista}
                    {#each respuestalista.data.tracks as cancion}
                        <Cancion {cancion} />
                    {/each}
                {/await}
            </div>
        </div>
    </main>
</section>