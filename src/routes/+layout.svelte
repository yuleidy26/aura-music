<script lang="ts">
    import '../app.css';
    import favicon from '#lib/assets/favicon.svg'; // <--- Cambia $lib por #lib
    import type { LayoutProps } from './$types';

    let { children }: LayoutProps = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}