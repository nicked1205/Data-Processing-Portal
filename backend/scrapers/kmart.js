async function scrapeProductSizes(page) {
  return await page.evaluate(() => {
    const sizes = [];
    const sizeButtons = document.querySelectorAll('ul.product-size > li button');

    sizeButtons.forEach(button => {
      const sizeLabel = button.querySelector('.MuiButton-label');
      if (sizeLabel) {
        sizes.push(sizeLabel.innerText.trim());
      }
    });

    return sizes;
  });
}

async function scrapeProductColors(page) {
  return await page.evaluate(() => {
    const colors = [];
    const colorButtons = document.querySelectorAll('ul.product-color > li button');

    colorButtons.forEach(button => {
      const img = button.querySelector('img');
      if (img && img.alt) {
        colors.push(img.alt.trim());
      }
    });

    return colors;
  });
}

export async function scrapeKmart(page) {
  const productData = await page.evaluate(() => {
    const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.innerText.trim() : null;
    };

    const getImage = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.src : null;
    };

    return {
      name: getText('h1[data-testid="product-title"]'),
      price: getText('div[data-testid="product-price"]'),
      starRating: getText('p[data-testid="rating-score"]'),
      description: getText('div[class^="ProductDescription"]'),
      badge: getText('span[data-testid="product-badge"]'),
    };
  });

  const sizes = await scrapeProductSizes(page);
  const colors = await scrapeProductColors(page);

  return {
    ...productData,
    sizes,
    colors,
  };
}