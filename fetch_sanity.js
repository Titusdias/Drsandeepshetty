const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '7xk15ogt',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false
});

client.fetch('*[_type == "gallerySection"]').then(console.log);