async function scrapeHighlights(page) {
  return await page.evaluate(() => {
    const highlightsSection = document.querySelector('div.product-highlights');
    if (!highlightsSection) return [];

    const containers = highlightsSection.querySelectorAll('div.container');
    const highlights = [];

    containers.forEach(container => {
        const span = container.querySelector('span.text');
        const spanText = span ? span.innerText.trim() : null;

        if (spanText) highlights.push(spanText);
    });

    return highlights;
  });
}

async function scrapeDescription(page) {
  return await page.evaluate(() => {
    const descContainer = document.querySelector('div.product-description');
    if (!descContainer) return null;

    const description = {};

    // Extract key-value pairs at the top
    const keyValuePairs = {};
    const pairs = descContainer.querySelectorAll('div.product-filter-types-values > p');
    if (pairs && pairs.length > 0) {
      pairs.forEach((pair, idx) => {
        const key = pair.querySelector('span.product-filter-type');
        const value = pair.querySelector('span.product-filter-values');
        if (key && value) {
          const keyText = key.innerText.trim().replace(':', '');
          const valueText = value.innerText.trim();
          keyValuePairs[keyText] = valueText;
        }
      });
    }
    description.keyValues = keyValuePairs;

    // Extract titled sections and their content
    const readMore = descContainer.querySelector('div#read-more-block-container div');
    if (readMore) {
      const sections = {};

      for (const node of readMore.children) {
        const header = node.querySelector('.description-attribute-header');
        if (node.tagName === 'DIV' && header) {
          const currentTitle = header.innerText.trim();
          sections[currentTitle.replace(':', '').trim()] = node.innerText.replace(currentTitle, '').trim();
        }
      }

      description.sections = sections;
    }

    return description;
  });
}

async function scrapeIngredients(page) {
  return await page.evaluate(() => {
    const result = {};

    // Product Claims label + values
    const claimsLabelEl = document.querySelector('.variant-ingredients-label');
    const claimsValueEl = document.querySelector('.variant-ingredients-values');
    if (claimsLabelEl && claimsValueEl) {
      result[claimsLabelEl.innerText.trim().replace(':', '')] = claimsValueEl.innerText.trim();
    }

    // Full ingredients text turned into a dictionary for each variant (if applicable)
    const ingredientsEl = document.querySelector('.product-ingredients-values');
    if (ingredientsEl) {
      const rawText = ingredientsEl.innerText.trim();

      const lines = rawText.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
      
        if (lines.length === 0) return null;

        // In case the ingredients are in a single line (probably a one-variant product)
        else if (lines.length === 1) {
            const ingredients = lines[0].split(',').map(v => v.trim()).filter(v => v.length > 0);
            result.ingredients = ingredients;
        
        // The ingredients are in multiple lines (multi-variant product)
        } else {
            const ingredientsDict = {};
            lines.forEach(line => {
                const match = line.match(/^([^\s:]+):\s*(.*)$/);
                if (match) {
                const key = match[1];
                const value = match[2].split(',').map(v => v.trim()).filter(v => v.length > 0);
                ingredientsDict[key] = value;
                } else {
                // Just in case the line is not a key-value pair
                ingredientsDict['misc'] = (ingredientsDict['misc'] || '') + line + ' ';
                }
            });

            result.ingredients = ingredientsDict;
        }
    }

    return result;
  });
}

async function scrapeVariants(page) {
  return await page.evaluate(() => {
    const variantContainers = document.querySelectorAll('.variant-selector');

    const variants = {};

    variantContainers.forEach(container => {
      const header = container.querySelector('.variant-selector-header .current-variant > span.current-variant-name');
      if (!header) return;

      // Variant category name e.g. Shade, Size
      const categoryEl = container.querySelector('.variant-selector-header > div > span:first-child');
      const category = categoryEl ? categoryEl.innerText.trim().replace(':', '') : 'Unknown';

      // Current selected variant name
      const current = header.innerText.trim();

      const optionsEls = container.querySelectorAll('ul.variant-swatches > li');
      const options = {};
      optionsEls.forEach(optionEl => {
        const optionNameEl = optionEl.querySelector('div.variant-swatch-heading');
        const optionPriceEl = optionEl.querySelector('p.product-price span[data-ge-price], p.product-price span.product-price-sale-new');
        if (optionNameEl && optionPriceEl) {
          const optionName = optionNameEl.innerText.trim();
          const optionPrice = optionPriceEl.innerText.trim();
          options[optionName] = optionPrice;
        }
      });

      variants[category] = {
        current,
        options,
      };
    });

    return variants;
  });
}

export async function scrapeSephora(page) {
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
        brand: getText('div.product-brand'),
        name: getText('div.product-heading'),
        price: getText('p.product-price span[data-ge-price], p.product-price span.product-price-sale-new'),
        wasPrice: getText('p.product-price span.product-price-sale-old'),
        priceReduction: getText('p.product-price span.product-price-sale-text'),
        starRating: getText('span.product-rating-text'),
        howToUse: getText('div.product-how-to-text'),
        tag: getText('span.pdp-exclusive-tag'),
    };
  });

  const highlights = await scrapeHighlights(page);
  const description = await scrapeDescription(page);
  const ingredients = await scrapeIngredients(page);
  const variants = await scrapeVariants(page);

  return {
    ...productData,
    highlights,
    description,
    ingredients,
    variants,
  };
}