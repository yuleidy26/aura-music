<script>
    import Cancion from '../lib/components/Cancion.svelte';
</script>

    <header class="bg-[#FFFFF]">
<div>
<img src="" alt="Logo de Aura Music">
<p>Aura Music</p>
</div> 

<div>
        <a href="">Iniciar sesión</a>
        <a href="">Crear cuenta</a>
</div>

    </header>


    <main class="bg-[#EDF1FD]">
    <!-- reproductor de musica -->
         <div> 
            <!-- album -->
            <div>
                <img src="" alt="Portada del álbum">
            </div>

            <!-- Información y controlesnfromacion  -->

            <div>
                <div>
                    <h2>nombre de la cancion</h2>
                    <p>nombre del artista</p>
                </div> 
                
                 <div>
                    <span>00:00'</span>
                    <input type="range">
                    <span>03:55</span>
                </div>

                 <div>
                    <button>Aleatorio</button>
                    <button>Anterior canción</button>
                    <button>Pausa/Reproducir</button>
                    <button>Siguiente canción</button>
                    <button>Bucle</button>
                </div>
            </div>

         </div> 

    <!-- lista de reproduccion -->
         <div> 
            <div> 
                <h2>lista de reproduccion</h2> 
                <p> 4 canciones 14 minutos </p>
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



