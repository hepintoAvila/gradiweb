import fetch from 'node-fetch'; 

const shopUrl = 'devtestrecruitte.myshopify.com';
const apiKey = 'd156c699edcc98186dae8e6f9562d838';
const password = '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';

const productsEndpoint = `https://${shopUrl}/admin/api/2021-10/products.json`;


function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${day}-${month}`;
}

async function fetchShopifyProducts() {
  const response = await fetch(productsEndpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${apiKey}:${password}`).toString('base64')}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    const products = data.products;

    if (products && products.length > 0) {
      const formattedProducts = products.map((product) => {
        return {
          title: product.title,
          createdAt: formatTimestamp(product.created_at),
        };
      });

      console.log(JSON.stringify(formattedProducts, null, 2));
    } else {
      console.log('No se encontraron productos.');
    }
  } else {
    console.error('Error al obtener los productos de Shopify:', response.status);
  }
}


fetchShopifyProducts();
