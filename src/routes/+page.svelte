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


    <main class="flex gap-8 items-center justify-center p-8">
    <!-- reproductor de musica -->
         <div class="bg-[#FFFFFF] flex flex-col items-center px-2 py-4 gap-4 rounded-3xl shadow-sm "> 
            <!-- album -->
            <div class="rounded-2xl overflow-hidden">
                <img src="" alt="Portada del álbum">
            </div>

            <!-- Información y controlesnfromacion  -->

            <div class="">
                <div class="flex flex-col">
                    <h2 class="font-bold text-xl">nombre de la cancion</h2>
                    <p class=" text-xs text-[#4A4550]">nombre del artista</p>
                </div> 
                
                 <div class="flex items-center gap-3 w-full">
                    <span class="text-[#7B7582] text-xs">00:00</span>
                    <input type="range" class="w-full">
                    <span class="text-[#7B7582] text-xs">03:00</span>
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
         <div class="bg-[#FFFFFF] flex flex-col items-center px-2 py-4 gap-4 rounded-3xl shadow-sm"> 
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
