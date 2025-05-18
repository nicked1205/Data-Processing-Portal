async function scrapeAllInfoCombined(page) {
  return await page.evaluate(() => {
    const textElements = document.querySelectorAll('[class^="text_component_text"]');

    let combinedText = '';
    textElements.forEach(el => {
      combinedText += el.innerText.trim() + '\n\n';
    });

    return combinedText.trim();
  });
}

async function scrapeBadges(page) {
  return await page.evaluate(() => {
    const badges = [];

    const container = document.querySelector('div[class^="product-roundels_component_roundel-container"]');
    if (!container) return [];
    badgeImages = container.querySelectorAll('img');

    badgeImages.forEach(img => {
      if (img.alt) {
        badges.push(img.alt.trim());
      }
    });

    return badges;
  });
}

async function scrapeImages(page) {
  return await page.evaluate(() => {
    const images = [];
    const imageElements = document.querySelectorAll('div[class^="image-thumbnails_thumbnails"] img');

    imageElements.forEach(img => {
      if (img.src) {
        images.push(img.src.trim());
      }
    });

    return images;
  });
}

export async function scrapeWoolworths(page) {
  const productData = await page.evaluate(() => {
    const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.innerText.trim() : null;
    };

    return {
      name: getText('h1[class^="product-title_component_product-title"]'),
      price: getText('div[class^="product-price_component_price-lead"]'),
      starRating: getText('div[class^="star-reviews_component_rating-label"]'),
    };
  });

  const combinedInfo = await scrapeAllInfoCombined(page);
  const badges = await scrapeBadges(page);
  const imageSources = await scrapeImages(page);

  return {
    ...productData,
    combinedInfo,
    badges,
    imageSources,
  };
}