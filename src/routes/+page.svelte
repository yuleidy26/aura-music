<script>
    import Cancion from '../lib/components/Cancion.svelte';
</script>

<section class="min-h-screen bg-[#EDF1FD]">

    <header class="flex justify-between items-center px-6 py-4 border-b border-[#C9C6D9]">

     <div class="flex items-center gap-2">
        <img src="" alt="Logo de Aura Music" class="w-8 h-8">
        <span class="font-bold text-lg">Aura Music</span>
    </div>
        
        
    <div class="flex items-center gap-7">
    <a href="" class="text-sm text-[#3F3A45]">Crear cuenta</a>

    <a href="" class="rounded-full bg-[#FFA0C5] px-5 py-2 text-sm font-semibold text-[#5A1239] shadow-md">Iniciar sesión</a>
    </div>

    </header>


    <main class="flex items-start justify-center gap-7 p-7">
    <!-- reproductor de musica -->
         <div class="w-[600px] shrink-0 bg-white flex flex-col gap-6 rounded-[40px] p-9 shadow-sm"> 
            <!-- album -->
            <div class="w-full flex justify-center">
            <img src="" alt="Portada del álbum"
            class="w-full max-w-[390px] aspect-square object-cover rounded-3xl">
            </div>

            <!-- Información y controles  -->

            <div class="w-full flex flex-col gap-4">
                <div class="flex flex-col">
                    <h2 class="font-bold text-xl">nombre de la cancion</h2>
                    <p class=" text-xs text-[#4A4550]">nombre del artista</p>
                </div> 
                
                <div class="flex flex-col gap-2 w-full">
                    <input type="range" min="0" max="100" value="0" class="w-full accent-pink-400">
                    <div class="flex justify-between">
                        <span class="text-[#7B7582] text-xs">00:00</span>
                        <span class="text-[#7B7582] text-xs">03:00</span>
                    </div>
                </div>

                 <div class="flex justify-center items-center gap-5 mt-4">
                 <button class="rounded-full bg-[#F5F2EE] px-3 py-3 text-sm">Aleatorio</button>
                    <button class="rounded-full bg-[#F5F2EE] px-3 py-3 text-sm">Anterior canción</button>
                    <button class="rounded-full bg-[#F5F2EE] px-3 py-3 text-sm">Pausa/Reproducir</button>
                    <button class="rounded-full bg-[#F5F2EE] px-3 py-3 text-sm">Siguiente canción</button>
                    <button class="rounded-full bg-[#F5F2EE] px-3 py-3 text-sm">Bucle</button>
                </div>
            </div>

         </div> 

        <!-- lista de reproduccion -->
        <div class="w-[420px] bg-white flex flex-col gap-6 rounded-[40px] p-9 shadow-sm">
            <div class="flex items-center justify-between w-full">
            <div>
                <h2 class="font-bold text-xl">Lista de Reproducción</h2>
                <p class="text-[#7B7582] text-xs">4 canciones • 14 min</p>
            </div>
            <img src="" alt="Logo de reproducción" class="w-6 h-6">
        </div>

            <div class="flex flex-col gap-3 w-full">
                <Cancion />
                <Cancion />
                <Cancion />
                <Cancion />
            </div>
        </div>
    </main>


</section>
