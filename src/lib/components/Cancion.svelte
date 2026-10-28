<script>
    import { actualizarCancion } from "#lib/state/cancion.svelte.js";

   

    
    let { cancion } = $props();

    const handlerClick = () => {
        actualizarCancion(cancion)

    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={ handlerClick } class="flex items-center gap-3 w-full rounded-xl p-2 hover:bg-[#F5F2F8]">
    <img
        src={cancion.album.image}
        alt={`Portada de ${cancion.artist.name}`}
        class="w-12 h-12 rounded-lg object-cover"
    />

    <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-sm">{cancion.title}</h3>
        <p class="text-xs text-[#7B7582]">{cancion.artist.name}</p>
    </div>

    <!-- <span class="text-xs text-[#7B7582]">{0}</span> -->
</div>