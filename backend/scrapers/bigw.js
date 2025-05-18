async function scrapePrice(page) {
  return await page.evaluate(() => {
    const priceContainer = document.querySelector('span.ProductPrice');
    if (!priceContainer) return null;

    const priceBlocks = Array.from(priceContainer.querySelectorAll('div[class^="VisuallyHidden_VisuallyHidden"]'))
        .map(div => div.innerText.trim());
    return priceBlocks.join(' - ');
  });
}

async function scrapeSpecs(page) {
  return await page.evaluate(() => {
    const container = document.querySelector('div[aria-labelledby="spec"]');
    if (!container) return null;

    const specs = {};
    const dts = container.querySelectorAll('dt');
    const dds = container.querySelectorAll('dd');

    if (dts.length !== dds.length) return null;

    for (let i = 0; i < dts.length; i++) {
      const key = dds[i].innerText.trim().replace(/:$/, '');
      const value = dts[i].innerText.trim();
      specs[key] = value;
    }

    return specs;
  });
}

async function scrapeVariants(page) {
  return await page.evaluate(() => {
    const variants = {};

    const colourEls = document.querySelectorAll('ul[class^="ProductColourSwatches_Options"] li a');
    const colours = Array.from(colourEls)
      .map(a => a.getAttribute('title').trim())
      .filter(t => t.length > 0);
    if (colours.length > 0) variants['Colour'] = colours;

    const sizeLabels = document.querySelectorAll('div[class^="ProductSizes_ProductSizesOptions"] span label');
    const sizes = Array.from(sizeLabels)
      .map(label => label.innerText.trim())
      .filter(text => text.length > 0);
    if (sizes.length > 0) variants['Size'] = sizes;

    return variants;
  });
}

async function scrapeLabels(page) {
  return await page.evaluate(() => {
        const labelDivs = document.querySelectorAll('div.ProductLabel');
        const labels = Array.from(labelDivs)
            .map(div => div.innerText.trim())
            .filter(text => text.length > 0);
        return labels.length > 0 ? labels : null;
    });
}

// async function scrapeStarRating (page) {
//   return await page.evaluate(() => {
//     const starRating = document.querySelector('span.bv_offscreen_text');
//     if (!starRating) return null;

//     return starRating.innerText.trim();
//   });
// }

export async function scrapeBigW(page) {
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
      name: getText('h1#product-title'),
      productDetails: getText('div[aria-labelledby="details"]'),
      priceSaving: getText('sup[class^="ProductPriceSaveFrom_ProductPriceSaveFrom"] div[class^="VisuallyHidden_VisuallyHidden"]'),
      color: getText('span[class^="ProductColourSwatches_SelectedColour"], span[class^="ProductColours_ProductColoursTitleSelectedColour"]'),
      unitPrice: getText('div.ProductUnitPrice'),
    };
  });

  const price = await scrapePrice(page);
  const specs = await scrapeSpecs(page);
  const variants = await scrapeVariants(page);
  const labels = await scrapeLabels(page);
//   const starRating = await scrapeStarRating(page);

  return {
    ...productData,
    price,
    specs,
    variants,
    labels,
  };
}