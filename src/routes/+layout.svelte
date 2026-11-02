<script lang="ts">
    import '../app.css';
    import favicon from '#lib/assets/favicon.svg';
    import type { LayoutProps } from './$types';

    let { children }: LayoutProps = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<header
    class="flex justify-between items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-[#C9C6D9] bg-[#EDF1FD]"
>
    <div class="flex items-center gap-2 sm:gap-3 min-w-0">
        
        <img src="/logo.webp" alt="Logo de Aura Music" class="w-10 h-10 sm:w-12 sm:h-12 shrink-0 object-contain" />
        <span class="font-bold text-base sm:text-lg whitespace-nowrap">Aura Music</span>
    </div>

    <div class="flex items-center gap-3 sm:gap-7 shrink-0">
        <a href="" class="inline text-xs sm:text-sm text-[#3F3A45] whitespace-nowrap">Crear cuenta</a>

        <a
            href=""
            class="rounded-full bg-[#FFA0C5] px-4 sm:px-5 py-2 text-sm font-semibold text-[#5A1239] whitespace-nowrap shadow-md shadow-pink-200"
            >Iniciar sesión</a
        >
    </div>
</header>

{@render children()}