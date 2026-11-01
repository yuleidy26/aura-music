
<script>
    import Cancion from "#lib/components/Cancion.svelte";
    import { estadocancion } from "#lib/state/cancion.svelte.js";
    import Icon from "@iconify/svelte";
    import axios from "axios";

    let reproductor;
    let reproduciendo = $state(false);

    const respuestacancion = axios.get(
        "https://leonardoapi.vercel.app/api/tracks"
    );

    const reproducirPausar = async () => {
        if (!reproductor || !estadocancion.actual) return;

        if (reproductor.paused) {
            try {
                await reproductor.play();
                reproduciendo = true;
            } catch (error) {
                console.error("No se pudo reproducir el audio:", error);
            }
        } else {
            reproductor.pause();
            reproduciendo = false;
        }
    };
</script>

<section class="min-h-screen bg-[#EDF1FD] text-[#4A4550]">

    <!-- MENÚ SUPERIOR -->
    <header class="flex items-center justify-between border-b border-[#C9C6D9] px-6 py-4">

        <div class="flex items-center gap-2">
            <img
                src="/logo.png"
                alt="Aura Music"
                class="h-8 w-8 object-contain"
            />
            <h1 class="text-xl font-bold">Aura Music</h1>
        </div>

        <nav class="flex items-center gap-6 text-sm">
            <a href="/">Iniciar sesión</a>
            <a href="/">Crear cuenta</a>
        </nav>

    </header>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="flex flex-col items-center justify-center gap-8 p-8 md:flex-row">

        <!-- REPRODUCTOR -->
        <section class="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm">

            {#if estadocancion.actual}

                <!-- PORTADA -->
                <div class="mb-6 overflow-hidden rounded-2xl">
                    <img
                        src={estadocancion.actual.album.image}
                        alt={`Portada de ${estadocancion.actual.title}`}
                        class="aspect-square w-full object-cover"
                    />
                </div>

                <!-- INFORMACIÓN DE LA CANCIÓN -->
                <div class="mb-6 text-center">
                    <h2 class="text-2xl font-bold">
                        {estadocancion.actual.title}
                    </h2>

                    <p class="mt-1 text-sm text-[#7B7582]">
                        {estadocancion.actual.artist.name}
                    </p>
                </div>

                <!-- TIEMPO -->
                <div class="mb-6">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value="0"
                        class="w-full accent-[#FF9FC3]"
                    />

                    <div class="flex justify-between text-xs text-[#7B7582]">
                        <span>00:00</span>
                        <span>03:00</span>
                    </div>
                </div>

                <!-- BOTONES -->
                <div class="flex items-center justify-center gap-6">

                    <button
                        class="text-[#7B7582]"
                        aria-label="Aleatorio"
                    >
                        <Icon icon="lucide:shuffle" width="22" />
                    </button>

                    <button
                        class="text-[#7B7582]"
                        aria-label="Canción anterior"
                    >
                        <Icon icon="lucide:skip-back" width="24" />
                    </button>

                    <button
                        onclick={reproducirPausar}
                        aria-label={reproduciendo ? "Pausar" : "Reproducir"}
                        class="rounded-full bg-[#FF9FC3] p-5 text-[#68134A] shadow-lg shadow-pink-200 transition-colors hover:bg-[#FF8DB8]"
                    >
                        <Icon
                            icon={reproduciendo ? "lucide:pause" : "lucide:play"}
                            width="24"
                        />
                    </button>

                    <button
                        class="text-[#7B7582]"
                        aria-label="Canción siguiente"
                    >
                        <Icon icon="lucide:skip-forward" width="24" />
                    </button>

                    <button
                        class="text-[#7B7582]"
                        aria-label="Repetir"
                    >
                        <Icon icon="lucide:repeat" width="22" />
                    </button>

                </div>

            {:else}

                <!-- MENSAJE INICIAL -->
                <div class="flex min-h-96 flex-col items-center justify-center text-center">
                    <Icon
                        icon="lucide:music-2"
                        width="56"
                        class="mb-4 text-[#FF9FC3]"
                    />

                    <h2 class="text-xl font-bold">
                        Bienvenido a Aura Music
                    </h2>

                    <p class="mt-2 text-sm text-[#7B7582]">
                        Selecciona una canción para comenzar.
                    </p>
                </div>

            {/if}

        </section>

        <!-- LISTA DE REPRODUCCIÓN -->
        <section class="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm">

            <h2 class="mb-5 text-xl font-bold">
                Lista de reproducción
            </h2>

            {#await respuestacancion}

                <p class="text-sm text-[#7B7582]">
                    Cargando canciones...
                </p>

            {:then respuestalista}

                {#each respuestalista.data.tracks as cancion (cancion.id)}
                    <Cancion {cancion} />
                {/each}

            {:catch error}

                <p class="text-sm text-red-500">
                    No se pudieron cargar las canciones.
                </p>

                <p class="text-xs text-[#7B7582]">
                    {error.message}
                </p>

            {/await}

        </section>

    </main>

    <!-- ELEMENTO DE AUDIO -->
    <audio
        bind:this={reproductor}
        src={estadocancion.actual?.audio}
        onended={() => (reproduciendo = false)}
    ></audio>

</section>
