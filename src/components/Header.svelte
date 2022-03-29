<script lang='ts'>
    export let size
    export let showCSS
    </script>
<div class='header'>
    <div class='container'>
    Solbera's DND 5e Fonts
    <span class='slider'>font size: {size} <input bind:value={size} type="range" min="12" max="50" /></span>
    <span class='slider'>Show CSS Code <input bind:checked={showCSS} type="checkbox" /></span>
    </div>
</div>

<style>
    .header {
        position: fixed;
        width: 100%;
        margin: 1;
        top: 0px;
        background-color: white;
    }

    @media (prefers-color-scheme: dark) {
        .header {
            background-color: #333;
		    color: #eee;
        }
    }

    .container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-left: 0.5rem;
    }

    input[type='range'] {
        vertical-align: middle;
    }

</style>