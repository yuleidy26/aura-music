<script lang="ts">
    import '../app.css';
    import favicon from '#lib/assets/favicon.svg'; // <--- Cambia $lib por #lib
    import type { LayoutProps } from './$types';

    let { children }: LayoutProps = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<header
    class="flex justify-between items-center px-6 py-4 border-b border-[#C9C6D9] bg-[#EDF1FD]"
>
    <div class="flex items-center gap-2">
        <img src="" alt="Logo de Aura Music" class="w-8 h-8" />
        <span class="font-bold text-lg">Aura Music</span>
    </div>

    <div class="flex items-center gap-7">
        <a href="" class="text-sm text-[#3F3A45]">Crear cuenta</a>

        <a
            href=""
            class="rounded-full bg-[#FFA0C5] px-5 py-2 text-sm font-semibold text-[#5A1239] shadow-md"
            >Iniciar sesión</a
        >
    </div>
</header>

{@render children()}