<script>
    import Cancion from "#lib/components/Cancion.svelte";
    import { 
        estadocancion, 
        alternarReproduccion, 
        inicializarLista, 
        siguienteCancion, 
        anteriorCancion, 
        alternarAleatorio, 
        alternarBucle 
    } from "#lib/state/cancion.svelte.js";
    import Icon from "@iconify/svelte";
    import axios from "axios";
    import { onMount } from "svelte";

    let listaCanciones = $state([]);
    let cargando = $state(true);

    // Cargar las canciones al montar el componente de forma segura
    onMount(async () => {
        try {
            const respuesta = await axios.get("https://leonardoapi.vercel.app/api/tracks");
            listaCanciones = respuesta.data.tracks;
            inicializarLista(listaCanciones);
        } catch (error) {
            console.error("Error al cargar las canciones:", error);
        } finally {
            cargando = false;
        }
    });

    // Variables de control de audio
    let elementoAudio = $state(null);
    let tiempoActual = $state(0);
    let duracionTotal = $state(0);

    // Formatear segundos a mm:ss
    function formatearTiempo(segundos) {
        if (isNaN(segundos) || segundos === 0) return "00:00";
        const minutos = Math.floor(segundos / 60);
        const segsRestantes = Math.floor(segundos % 60);
        return `${minutos.toString().padStart(2, '0')}:${segsRestantes.toString().padStart(2, '0')}`;
    }

    // Efecto para sincronizar la reproducción con la etiqueta <audio>
    $effect(() => {
        if (!elementoAudio || !estadocancion.actual) return;

        if (estadocancion.reproduciendo) {
            elementoAudio.play().catch(console.error);
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

    // Manejar cuando termina una canción
    function manejarFinCancion() {
        if (estadocancion.bucle) {
            elementoAudio.currentTime = 0;
            elementoAudio.play().catch(console.error);
        } else {
            siguienteCancion();
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
        onended={manejarFinCancion}
        autoplay
    ></audio>
{/if}

<section class="min-h-screen bg-[#EDF1FD]">
    <main class="flex items-start justify-center gap-7 p-7">
        <!-- reproductor de musica -->
        {#if estadocancion.actual}
        <div class="w-[600px] shrink-0 bg-white flex flex-col gap-6 rounded-[40px] p-9 shadow-sm">
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
                <div class="flex flex-col">
                    <h2 class="font-bold text-xl">{estadocancion.actual.title}</h2>
                    <p class="text-xs text-[#4A4550]">{estadocancion.actual.artist.name}</p>
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

                <div class="flex justify-center items-center gap-5 mt-4">
                    <!-- Aleatorio -->
                    <button 
                        onclick={alternarAleatorio}
                        class="rounded-full p-3 transition-colors {estadocancion.aleatorio ? 'bg-pink-100 text-pink-500' : 'text-[#85808C] hover:bg-[#F5F2EE]'}"
                    >
                        <Icon icon="lucide:shuffle" width="20" />
                    </button>

                    <!-- Canción anterior -->
                    <button 
                        onclick={anteriorCancion}
                        class="rounded-full bg-[#F5F2EE] p-3 text-[#242124] hover:bg-[#EAE5E0] transition-colors"
                    >
                        <Icon icon="lucide:skip-back" width="20" />
                    </button>

                    <!-- Botón Reproducir / Pausar -->
                    <button
                        onclick={alternarReproduccion}
                        class="rounded-full bg-[#FF9FC3] p-5 text-[#68134A] shadow-lg shadow-pink-200 hover:bg-[#FF8DB8] transition-colors"
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
                        class="rounded-full bg-[#F5F2EE] p-3 text-[#242124] hover:bg-[#EAE5E0] transition-colors"
                    >
                        <Icon icon="lucide:skip-forward" width="20" />
                    </button>

                    <!-- Repetir -->
                    <button 
                        onclick={alternarBucle}
                        class="rounded-full p-3 transition-colors {estadocancion.bucle ? 'bg-pink-100 text-pink-500' : 'text-[#85808C] hover:bg-[#F5F2EE]'}"
                    >
                        <Icon icon="lucide:repeat" width="20" />
                    </button>
                </div>
            </div>
        </div>
        {:else}
            <div class="w-[600px] shrink-0 bg-white flex flex-col gap-6 rounded-[40px] p-9 shadow-sm justify-center items-center text-[#7B7582]">
                <p>Selecciona una canción para comenzar a escuchar</p>
            </div>
        {/if}

        <!-- lista de reproduccion -->
        <div class="w-[420px] bg-white flex flex-col gap-6 rounded-[40px] p-9 shadow-sm">
            <div class="flex items-center justify-between w-full">
                <div>
                    <h2 class="font-bold text-xl">Lista de Reproducción</h2>
                    <p class="text-[#7B7582] text-xs">{listaCanciones.length} canciones • 14 min</p>
                </div>
            </div>

            <div class="flex flex-col gap-3 w-full">
                {#if cargando}
                    <div class="flex justify-center items-center py-4">
                        <div class="w-6 h-6 border-4 border-[#F8A5C2] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                {:else}
                    {#each listaCanciones as cancion}
                        <Cancion {cancion} />
                    {/each}
                {/if}
            </div>
        </div>
    </main>
</section>