<div class="pill-container">
    <slot />
    <button on:click class="pill-remove">&times;</button>
</div>

<style>
    .pill-container {
        padding: 0.25rem 0.75rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 999px;
        border: 1px solid var(--color-plasma-100);
    }

    .pill-remove {
        appearance: none;
        border: none;
        background-color: transparent;                      
    }
</style>