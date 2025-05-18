async function scrapeNutritionalInfo(page) {
  return await page.evaluate(() => {
    const tableRows = Array.from(document.querySelectorAll('#nutritional-information-control table tbody tr'));
    const nutrition = [];

    tableRows.forEach(row => {
      const cells = row.querySelectorAll('th, td');
      if (cells.length >= 3) {
        nutrition.push({
          nutrient: cells[0].innerText.trim(),
          per100ml: cells[1].innerText.trim(),
          perServing: cells[2].innerText.trim(),
        });
      }
    });

    return nutrition;
  });
}

async function scrapeAttributes(page) {
  return await page.evaluate(() => {
    const attributes = [];
    const container = document.querySelector('.dietary-allergen-list');
    if (!container) return [];

    const attributeElements = container.querySelectorAll('span');

    attributeElements.forEach(attr => {
      const text = attr.innerText.trim();
      if (text) {
        attributes.push(text);
      }
    });

    return attributes;
  });
}

async function scrapeImages(page) {
  return await page.evaluate(() => {
    const images = [];
    const imageElements = document.querySelectorAll('img[data-testid^="product-image"]');

    imageElements.forEach(img => {
      if (img.src) {
        images.push(img.src.trim());
      }
    });

    return images;
  });
}

export async function scrapeColes(page) {
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
      name: getText('.product__title'),
      brand: getText('.brand-link'),
      price: getText('.price__value'),
      priceNotes: getText('.price__calculation_method'),
      starRating: getText('.bv_avgRating_component_container'),
      description: (() => {
        const descEl = document.querySelector('div[data-testid="read-more-content"] > div');
        return descEl ? descEl.innerText.trim() : null;
      })(),
      ingredients: getText('#ingredients-control div div'),
      usageInstructions: getText('#usage-instructions-control div div'),
      storageInstructions: getText('#storage-instructions-control div div'),
      allergens: getText('#allergen-control div div'),
      dietary: getText('#dietary-control div div'),
      badge: getText('.product-roundel'),
      offers: getText('div[data-testid="offers"]'),
    };
  });

  const nutrition = await scrapeNutritionalInfo(page);
  const attributes = await scrapeAttributes(page);
  const imageSources = await scrapeImages(page);

  return {
    ...productData,
    nutrition,
    attributes,
    imageSources,
  };
}