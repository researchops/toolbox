<script lang="ts">
    export let data = { title: '' }
    let { title } = data
  </script>

<footer>
    <p>
        &copy;{new Date().getFullYear()} by {title} <a href="https://researchops.community/">ResearchOps Communiity</a><br>
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC Attribution-Sharealike International Licence</a>
    </p>
</footer>

<style>
    footer {
        bottom: 0;
        margin-top: 4rem;
        width: 100vw;
        padding: 1rem;
        background-color: var(--color-site-footer-bg);
        font-size: var(--font-size-sm);
        text-align: center;
    }

    p,
    a,
    a:visited {
        color: var(--color-site-footer-fg);
    }
</style>