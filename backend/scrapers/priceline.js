async function scrapeBadgeandPromotion (page) {
    const altText = {
        '1076': 'Save 35%',
        '1075': 'Save 30%',
        '1031': '1/2 Price',
        '1073': 'Save 20%',
        '1077': 'Save 40%',
        '1108': 'Save 30%, Member Exclusive',
        '1107': 'Save 40%, Member Exclusive',
    }

    return await page.evaluate((altMap) => {
        const el = document.querySelector('cx-media.promo-img img');
        if (el && el.alt) return altMap[el.alt];
        else return null;
    }, altText);
}

async function scrapeInfo(page, panelName) {
  try {
        await page.click(`button[aria-controls="${panelName}"]`);
        await page.waitForSelector(`#${panelName}`, { visible: true, timeout: 5000 });
    } catch (error) {
        return null;
    }

    return await page.evaluate((panel) => {
        const el = document.querySelector(`#${panel}`);
        if (el) return el.innerText.trim();
        else return null;
    }, panelName);

}

export async function scrapePriceline(page) {    
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
        brand: getText('a.brand-link'),
        name: getText('h1.name'),
        price: getText('div.common-price-sticker, div.price-tarif'),
        wasPrice: getText('div.was-price-sticker'),
        starRating: getText('div.rating-detail-inner span.font-big'),
        description: getText('span.sanitize'),
        badge: getText('span[data-testid="product-badge"]'),
        promotion: getText('div.pill-container'),
    };
  });

  const moreInfo = await scrapeInfo(page, 'panel-0');
  const directionsAndIngredients = await scrapeInfo(page, 'panel-2');
  const warningsAndDisclaimers = await scrapeInfo(page, 'panel-3');

  return {
    ...productData,
    moreInfo,
    directionsAndIngredients,
    warningsAndDisclaimers,
  };
}