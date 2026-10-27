<script>
    import Cancion from '../lib/components/Cancion.svelte';
</script>

<section class="bg-[#EDF1FD]">

    <header class="flex justify-between items-center px-6 py-4 border-b border-[#C9C6D9]">

     <div class="flex items-center gap-2">
        <img src="" alt="Logo de Aura Music" class="w-8 h-8">
        <span class="font-bold text-lg">Aura Music</span>

    </div>

     <div class="flex gap-4">
        <a href="">Iniciar sesión</a>
        <a href="">Crear cuenta</a>
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

            <!-- Información y controlesnfromacion  -->

            <div class="w-full flex flex-col gap-4">
                <div class="flex flex-col">
                    <h2 class="font-bold text-xl">nombre de la cancion</h2>
                    <p class=" text-xs text-[#4A4550]">nombre del artista</p>
                </div> 
                
                <div class="flex flex-col gap-2 w-full">
                    <input type="range" class="w-full accent-pink-400">
                    <div class="flex justify-between">
                        <span class="text-[#7B7582] text-xs">00:00</span>
                        <span class="text-[#7B7582] text-xs">03:00</span>
                    </div>
                </div>

                 <div class="flex justify-between items-center gap-6 mt-4">
                    <button>Aleatorio</button>
                    <button>Anterior canción</button>
                    <button>Pausa/Reproducir</button>
                    <button>Siguiente canción</button>
                    <button>Bucle</button>
                </div>
            </div>

         </div> 

    <!-- lista de reproduccion -->
         <div class="w-[420px] bg-white flex flex-col gap-6 rounded-[40px] p-9 shadow-sm">
            <div> 
                <h2 class="font-bold text-xl">Lista de Reproducción</h2> 
                <p class="text-[#7B7582] text-xs"> 4 canciones • 14 min</p>
                <img src="" alt="logo de reproduccion">


            </div> 

            <div>
                <Cancion />
                <Cancion />
                <Cancion />
                <Cancion />
            </div>

         </div>
    </main>


</section>
