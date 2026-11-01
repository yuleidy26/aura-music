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
</script>

<section class="min-h-screen bg-[#EDF1FD]">

    
    <main class="flex items-start justify-center gap-7 p-7">
        <!-- reproductor de musica -->

        {#if estadocancion.actual}
        
        <div
            class="w-[600px] shrink-0 bg-white flex flex-col gap-6 rounded-[40px] p-9 shadow-sm"
        >
            <!-- album -->
            <div class="w-full flex justify-center">
                <img
                    src={estadocancion.actual.album.image}
                    alt="Portada del álbum"
                    class="w-full max-w-[390px] aspect-square object-cover rounded-3xl"
                />
            </div>

            <!-- Información y controles  -->

            <div class="w-full flex flex-col gap-4">
                <div class="flex flex-col">
                    <h2 class="font-bold text-xl">{estadocancion.actual.title}</h2>
                    <p class=" text-xs text-[#4A4550]">{estadocancion.actual.artist.name}</p>
                </div>

                <div class="flex flex-col gap-2 w-full">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value="0"
                        class="w-full accent-pink-400"
                    />
                    <div class="flex justify-between">
                        <span class="text-[#7B7582] text-xs">00:00</span>
                        <span class="text-[#7B7582] text-xs">03:00</span>
                    </div>
                </div>

                <div class="flex justify-center items-center gap-5 mt-4">
                    <!-- Aleatorio -->
                    <button
                        class="rounded-full p-3 text-[#85808C] hover:bg-[#F5F2EE] transition-colors"
                    >
                        <Icon icon="lucide:shuffle" width="20" />
                    </button>
                    <!-- Canción anterior -->
                    <button
                        class="rounded-full bg-[#F5F2EE] p-3 text-[#242124] hover:bg-[#EAE5E0] transition-colors"
                    >
                        <Icon icon="lucide:skip-back" width="20" />
                    </button>
                    <!-- Reproducir -->
                    <button
                        class="rounded-full bg-[#FF9FC3] p-5 text-[#68134A] shadow-lg shadow-pink-200 hover:bg-[#FF8DB8] transition-colors"
                    >
                        <Icon icon="lucide:pause" width="24" />
                    </button>

                    <!-- Canción siguiente -->
                    <button
                        class="rounded-full bg-[#F5F2EE] p-3 text-[#242124] hover:bg-[#EAE5E0] transition-colors"
                    >
                        <Icon icon="lucide:skip-forward" width="20" />
                    </button>

                    <!-- Repetir -->
                    <button
                        class="rounded-full p-3 text-[#85808C] hover:bg-[#F5F2EE] transition-colors"
                    >
                        <Icon icon="lucide:repeat" width="20" />
                    </button>
                </div>
            </div>
        </div>

        
{:else}
    <div class="w-[600px] shrink-0 bg-white flex flex-col gap-6 rounded-[40px] p-9 shadow-sm">

        <!-- Portada provisional -->
        <div class="w-full flex justify-center">
            <div class="w-full max-w-[390px] aspect-square rounded-3xl bg-[#EDF1FD] flex flex-col items-center justify-center gap-4">
                <Icon icon="lucide:music-2" width="90" height="90" class="text-[#F8A5C2]" />
                <span class="text-[#7B7582] text-sm font-semibold">AURA MUSIC</span>
            </div>
        </div>

        <!-- Bienvenida -->
        <div class="w-full flex flex-col gap-4">
            <div class="flex flex-col">
                <h2 class="font-bold text-xl text-[#4A4550]">
                    ¡Bienvenido a Aura Music!
                </h2>
                <p class="text-xs text-[#7B7582]">
                    Selecciona una canción para comenzar
                </p>
            </div>

            <!-- Barra de progreso -->
            <div class="flex flex-col gap-2 w-full">
                <input type="range" min="0" max="100" value="0" disabled class="w-full accent-pink-400" />
                <div class="flex justify-between">
                    <span class="text-[#7B7582] text-xs">00:00</span>
                    <span class="text-[#7B7582] text-xs">00:00</span>
                </div>
            </div>

            <!-- Botones decorativos -->
            <div class="flex justify-center items-center gap-5 mt-4">
                <div class="rounded-full p-3 text-[#85808C]">
                    <Icon icon="lucide:shuffle" width="20" />
                </div>
                <div class="rounded-full bg-[#F5F2EE] p-3 text-[#242124]">
                    <Icon icon="lucide:skip-back" width="20" />
                </div>
                <div class="rounded-full bg-[#FF9FC3] p-5 text-[#68134A] shadow-lg shadow-pink-200">
                    <Icon icon="lucide:play" width="24" />
                </div>
                <div class="rounded-full bg-[#F5F2EE] p-3 text-[#242124]">
                    <Icon icon="lucide:skip-forward" width="20" />
                </div>
                <div class="rounded-full p-3 text-[#85808C]">
                    <Icon icon="lucide:repeat" width="20" />
                </div>
            </div>
        </div>
    </div>
{/if}


        <!-- lista de reproduccion -->
        <div
            class="w-[420px] bg-white flex flex-col gap-6 rounded-[40px] p-9 shadow-sm"
        >
            <div class="flex items-center justify-between w-full">
                <div>
                    <h2 class="font-bold text-xl">Lista de Reproducción</h2>
                    <p class="text-[#7B7582] text-xs">4 canciones • 14 min</p>
                </div>
                <img src="" alt="Logo de reproducción" class="w-6 h-6" />
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

    <audio
    bind:this={reproductor}
    src={estadocancion.actual?.audio}
    onended={() => reproduciendo = false}
></audio>
</section>
