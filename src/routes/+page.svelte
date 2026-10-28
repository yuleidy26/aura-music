<script>
    import Cancion from "../lib/components/Cancion.svelte";
    import Icon from "@iconify/svelte";
    import axios from "axios";

    const respuestacancion = axios.get ('https://leonardoapi.vercel.app/api/tracks')
</script>

<section class="min-h-screen bg-[#EDF1FD]">

    <main class="flex items-start justify-center gap-7 p-7">
        <!-- reproductor de musica -->
        <div
            class="w-[600px] shrink-0 bg-white flex flex-col gap-6 rounded-[40px] p-9 shadow-sm"
        >
            <!-- album -->
            <div class="w-full flex justify-center">
                <img
                    src="/olivia.webp"
                    alt="Portada del álbum"
                    class="w-full max-w-[390px] aspect-square object-cover rounded-3xl"
                />
            </div>

            <!-- Información y controles  -->

            <div class="w-full flex flex-col gap-4">
                <div class="flex flex-col">
                    <h2 class="font-bold text-xl">nombre de la cancion</h2>
                    <p class=" text-xs text-[#4A4550]">nombre del artista</p>
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
                <Cancion
                    portada="/cuco.webp"
                    artista="Cuco"
                    titulo="Lover Is a Day"
                    duracion="7:36"
                />
                <Cancion
                    portada="/scott.webp"
                    artista="Metric"
                    titulo="Black Sheep"
                    duracion="4:55"
                />
                <Cancion
                    portada="/weezer.webp"
                    artista="Weezer"
                    titulo="Go Away"
                    duracion="3:13"
                /><Cancion
                    portada="/feist.webp"
                    artista="Feist"
                    titulo="My Moon My Man"
                    duracion="3:48"
                />
            </div>
        </div>
    </main>
</section>
