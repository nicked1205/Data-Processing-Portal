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

    return await page.evaluate(() => {
        const el = document.querySelector('cx-media.promo-img.is-initialized img');
        if (el && el.alt) return altText[el.alt];
        else return null;
    });
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
        moreInfo: getText('#panel-0'),
        directionsAndIngredients: getText('#panel-2'),
        warningsAndDisclaimers: getText('#panel-3'),
        promotion: getText('div.pill-container'),
    };
  });

  return {
    ...productData,
  };
}