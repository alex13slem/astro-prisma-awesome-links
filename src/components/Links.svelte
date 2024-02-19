<script lang="ts">
  import type { Link } from '@prisma/client';
  import { gql } from '@urql/core';
  import urqlClient from '../../lib/urqlClient';
  import type { Page } from '../types/graphql';
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';

  const AllLinksQuery = gql`
    query allLinksQuery($first: Int, $after: ID) {
      links(first: $first, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            imageUrl
            url
            title
            category
            description
            id
          }
        }
      }
    }
  `;

  let limit = 1;
  let after: string | null = null;
  let links: Page<Link> | null = null;
  let cardLoad = false;
  let hasNext: boolean = false;

  async function loadCard() {
    try {
      cardLoad = true;
      const { data } = await urqlClient
        .query(AllLinksQuery, { first: limit })
        .toPromise();

      links = data.links;
      hasNext = links?.pageInfo.hasNextPage || false;
      // after = links?.pageInfo.endCursor || null;
    } catch (error) {
      console.error(error);
    } finally {
      cardLoad = false;
    }
  }

  onMount(async () => {
    await loadCard();
  });

  $: if (limit) loadCard();
</script>

<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
  {#if !links}
    Load...
  {:else}
    {#each links.edges as { node: link } (link.id)}
      <li class="shadow max-w-md rounded" transition:scale>
        <img class="shadow-sm" src={link.imageUrl} alt="" />
        <div class="p-5 flex flex-col space-y-2">
          <p class="text-sm text-blue-500">{link.category}</p>
          <p class="text-lg font-medium">{link.title}</p>
          <p class="text-gray-600">{link.description}</p>
          <a href={link.url} class="flex hover:text-blue-500">
            {link.url.replace(/(^\w+:|^)\/\//, '')}
            <svg
              class="w-4 h-4 my-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
              />
              <path
                d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
              />
            </svg>
          </a>
        </div>
      </li>
    {/each}
    <button
      on:click={() => {
        limit += 3;
        // loadCard();
      }}
      disabled={!hasNext}
    >
      {#if cardLoad}
        Card Load...
      {:else if !hasNext}
        :(
      {:else}
        Next Card
      {/if}
    </button>
  {/if}
</ul>
