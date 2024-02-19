<script lang="ts">
  import { gql } from '@urql/core';
  import urqlClient from '../../lib/urqlClient';
  import type { Page } from '../types/graphql';
  import type { Link } from '@prisma/client';
  import { onMount } from 'svelte';
  import prisma from '../../lib/prismaClient';

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

  async function loadLinks() {
    const { data } = await urqlClient?.query(AllLinksQuery, {}).toPromise();
    links = data.links;
  }

  async function deleteById(id: number) {
    try {
      await prisma.link.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  onMount(async () => {
    await loadLinks();
  });

  let links: Page<Link> | null = null;
</script>

<div class="root">
  {#if links}
    {#each links.edges as link}
      <div class="link">
        <p class="id">{link.node.id}</p>
        <img src={link.node.imageUrl} alt={link.node.title} />
        <div class="info">
          <p class="category">Category: {link.node.category}</p>
          <p class="title">Title: {link.node.title}</p>
          <p class="description">Description: {link.node.description}</p>
          <p class="url">URL: <a href={link.node.url}>{link.node.url}</a></p>
        </div>
        <button on:click={() => deleteById(link.node.id)}>Delete</button>
      </div>
    {/each}
  {/if}
</div>

<style>
  .root {
    display: grid;
  }
  .link {
    display: flex;
    gap: 30px;
    min-height: 150px;
  }
  .link > img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    object-position: center;
  }
  .info {
    display: grid;
    align-content: start;
    gap: 0.2rem;
  }
</style>
