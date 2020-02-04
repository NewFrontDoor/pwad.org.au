import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'w0mujm5q',
  dataset: 'production',
  token: process.env.SANITY_TOKEN
  // TODO: useCdn: true
});

export default client;
