export async function scrapeChemist(page) {
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
        return el && el.alt ? el.alt.trim().replace(' icon Chemist Warehouse', '').replace('Chemist Warehouse - ', '') : null;
    };

    return {
        name: getText('div.product-name'),
        price: getText('span.product__price'),
        retailPrice: getText('div.retailPrice'),
        saving: getText('div.Savings'),
        starRating: getText('span.bv-rating'),
        generalInfo: getText('section.general-info'),
        miscellaneous: getText('section.miscellaneous'),
        drugInteractions: getText('section.druginteractions'),
        warnings: getText('section.warnings'),
        commonUses: getText('section.commonuses'),
        ingredients: getText('section.ingredients'),
        directions: getText('section.directions'),
        indications: getText('section.indications'),
        badge: getImageAlt('img.product_image_overlay'),
    };
  });

  return {
    ...productData,
  };
}