async function scrapeSpecs(page) {
  return await page.evaluate(() => {
    const detailsContainer = document.getElementById('details');
    if (!detailsContainer) return null;

    const dl = detailsContainer.querySelector('dl');
    if (!dl) return null;

    const specs = {};
    const terms = dl.querySelectorAll('dt');
    const descriptions = dl.querySelectorAll('dd');

    if (terms.length !== descriptions.length) return null;

    for (let i = 0; i < terms.length; i++) {
      const key = terms[i].innerText.trim();
      const value = descriptions[i].innerText.trim();
      specs[key] = value;
    }

    return specs;
  });
}

async function scrapeVariants(page) {
  return await page.evaluate(() => {
    const variants = {};

    // For the pages where photos are used as color variants
    const photoContainer = document.getElementById('swatch-variants-colour');
    if (photoContainer) {
      const images = photoContainer.querySelectorAll('img');
      const colors = Array.from(images)
        .map(img => img.alt?.trim())
        .filter(alt => alt && alt.length > 0);
      if (colors.length > 0) variants['Color'] = colors;
    }

    // For the pages where texts are used as variants
    const buttonContainers = Array.from(document.querySelectorAll('[id^="button-variants-"]'));

    buttonContainers.forEach(container => {
      const variantName = container.id.replace('button-variants-', '').replace(/-/g, ' ');
      
      const options = Array.from(container.querySelectorAll('a'))
        .map(a => a.innerText.trim().replace('\n', ' Price: '))
        .filter(text => text.length > 0);

      if (options.length > 0) {
        const formattedName = variantName.replace(/\b\w/g, c => c.toUpperCase());
        variants[formattedName] = options;
      }
    });

    return variants;
  });
}

export async function scrapeJbhifi(page) {
  const productData = await page.evaluate(() => {
    const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.innerText.trim() : null;
    };

    const getImage = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.src : null;
    };

    const getImageAlt = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.alt.trim() : null;
    };

    return {
        brand: getImageAlt('img#pdp-brand-logo'),
        name: getText('div#product-title h1'),
        price: getText('div[class^="PriceTag_priceTag"]'),
        wasPriceOrDealName: getText('div[class^="PriceTag_floatingHeader"]'),
        promotion: getText('div[class^="PriceTag_footerWrapper"]'),
        starRating: getText('div[itemprop="ratingValue"]'),
        productOverview: getText('div#product-overview'),
        banner: getText('div#pdp-banner-label'),
        keyFeaturesSummary: getText('div#pdp-kf-summary'),
    };
  });

  const specs = await scrapeSpecs(page);
  const variantsAndPrices = await scrapeVariants(page);

  return {
    ...productData,
    specs,
    variantsAndPrices,
  };
}