<script lang="ts">
  import Header from "./components/Header.svelte";
  import { fade, fly } from "svelte/transition";
  import { baseURL, data, examplePhrases } from "./data";
  $: showCSS = true;
  let size = 32;
  function cssVariables(node, variables) {
    setCssVariables(node, variables);
    return {
      update(variables) {
        setCssVariables(node, variables);
      },
    };
  }
  function setCssVariables(node, variables) {
    for (const name in variables) {
      node.style.setProperty(`--${name}`, variables[name]);
    }
  }
  export let name: string;
  function title(str) {
    return str.replace(/(^|\s)\S/g, function (t) {
      return t.toUpperCase();
    });
  }

  const kebabCase = (string) =>
    string
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
</script>

<svelte:head>
  <title>Solbera's Dungeons and Dragons Fifth Edition Fonts</title>
  <meta
    name="description"
    content="A dingus to show Solbera's 22 DND 5e font faces, released uncer CC-BY-SA 4.0"
  />
</svelte:head>

<!-- <header> -->
<!-- </header> -->
<Header bind:size bind:showCSS />
<p style='padding-top:3em'>
  This is a copy of Solbera's Creative Commons Attribution Share-Alike 4.0 fonts
  taken from <a
    href="https://www.reddit.com/r/UnearthedArcana/comments/3vpphx/5e_font_package_embeddable_cc_edition/"
    >this Reddit thread</a
  >, combined with Ryrok's fixes from
  <a
    href="https://www.reddit.com/r/UnearthedArcana/comments/4loka0/fixed_versions_of_solberas_fonts/"
    >this Reddit thread</a
  >.
</p>
<p>The fonts have unique names based on the original fonts' names:</p>
<table>
  <thead>
    <tr>
      <th>Original Font</th>
      <th>Solbera's Font</th>
      <th><a href='http://taxidermicowlbear.weebly.com/dd-fonts.html'>Usage</a></th>
    </tr>
  </thead>
  <tbody>
    {#each data as font}
      <tr>
        <td>{font.originalFont}</td>
        <td><a href="#{kebabCase(font.family)}">{font.family}</a></td>
        <td>{font.use}</td>
      </tr>
    {/each}
  </tbody>
</table>
<p>
  This webpage represents the fonts in this GitHub repository as web fonts,
  using your browser's <a href="https://caniuse.com/#feat=ttf"
    >OpenType font support</a
  >.
</p>
<div class="container">
  {#each data as font, i}
    {@const code = `
			@font-face {
				font-family: '${font.family}';
				src: 
				local('${font.family}'),
				local('./${font.family}/${font.family}.otf'),
				url('${baseURL}${encodeURIComponent(font.family)}/${encodeURIComponent(
      font.family
    )}.otf') format('opentype');
			}`}
    <p
      id={kebabCase(font.family)}
      contenteditable
      use:cssVariables={{ size }}
      class="demo"
      style="font-family: '{font.family}', serif;"
    >
      This text is in {font.family}. {examplePhrases[i]}
    </p>
    {#if showCSS}
      <details transition:fade>
        <summary>CSS code for {font.family}</summary>
        <pre><code class="css">{code}</code></pre>
      </details>
    {/if}
    {#each Object.entries(font.variants) as [variant, value]}
      {@const fontName = `${font.family} ${title(variant)}`}
      {@const code = `
				@font-face {
					font-family: '${font.family}';
					${variant.includes("bold") ? "font-weight: bold;" : ""}
					${variant.includes("italic") ? "font-style: italic;" : ""}
					src: 
					local('${font.family}'),
					local('./${font.family}/${font.family}.otf'),
					url('${baseURL}${encodeURIComponent(font.family)}/${encodeURIComponent(
        fontName
      )}.otf') format('opentype');
				}`}
      {#if value}
        <p
          contenteditable
          use:cssVariables={{ size }}
          class="demo"
          style="font-family: '{font.family}', serif; font-weight: {variant.includes(
            'bold'
          )
            ? 'bold'
            : ''}; font-style: {variant.includes('italic') ? 'italic' : ''};"
        >
          This text is in {font.family}
          {variant}. {examplePhrases[i]}
        </p>
        {#if showCSS}
          <details out:fade in:fly>
            <summary>CSS code for {font.family}</summary>
            <pre><code class="css">{code}</code></pre>
          </details>
        {/if}
      {/if}
    {/each}
  {/each}
</div>

<footer>
  <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"
    ><img
      alt="Creative Commons License"
      style="border-width:0"
      src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
    /></a
  ><br />This work is licensed under a
  <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"
    >Creative Commons Attribution-ShareAlike 4.0 International License</a
  >.
</footer>

<style>

	table {
		border-collapse: collapse;
		border-spacing: 0;
		width: 100%;
	}
	details {
		overflow-x: auto;
	}

	.container {
		padding-top: 3em;
	}

  .demo {
    font-size: calc(var(--size) * 1px);
  }

  footer {
	padding-top: 3em;
	text-align: center;
  }


</style>
