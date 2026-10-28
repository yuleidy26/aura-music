<script>
    let { portada, artista, titulo, duracion } = $props();
</script>

<div class="flex items-center gap-3 w-full rounded-xl p-2 hover:bg-[#F5F2F8]">
    <img
        src={portada}
        alt={`Portada de ${artista}`}
        class="w-12 h-12 rounded-lg object-cover"
    />

    <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-sm">{titulo}</h3>
        <p class="text-xs text-[#7B7582]">{artista}</p>
    </div>

    <span class="text-xs text-[#7B7582]">{duracion}</span>
</div>