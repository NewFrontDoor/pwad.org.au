import {createContext} from 'react';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'w0mujm5q',
  dataset: 'production',
  token: process.env.SANITY_TOKEN
  // TODO: useCdn: true
});

export const SanityContext = createContext(client);

export function fetchQuery(query, params) {
  return client.fetch(query, params);
}

export default client;
