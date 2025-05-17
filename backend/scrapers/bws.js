async function scrapePackOptions(page) {
  return await page.evaluate(() => {
    const options = [];

    const packSelector = document.querySelector('.trolley-controls__pack-selector');

    const packContainers = packSelector.querySelectorAll('.trolley-controls_volume');

    packContainers.forEach(container => {
      const titleEl = container.querySelector('.trolley-controls_volume_title');
      const currencyEl = container.querySelector('.trolley-controls_volume_price .trolley-controls_volume_price--dollarsign');
      const priceEl = container.querySelector('.trolley-controls_volume_price .trolley-controls_volume_price--dollars');

      const title = titleEl ? titleEl.innerText.trim() : null;
      const currency = currencyEl ? currencyEl.innerText.trim() : '';
      const price = priceEl ? priceEl.innerText.trim() : '';

      if (title && price) {
        options.push({ size: title, price: currency + price });
      }
    });

    return options;
  });
}

async function scrapeAdditionalDetails(page) {
  return await page.evaluate(() => {
    const details = {};

    const container = document.querySelector('div[expandable-content="product-additional-details"]');

    if (!container) return details;

    const listItems = container.querySelectorAll('li.list--details_item');

    listItems.forEach(item => {
      const keyEl = item.querySelector('strong');
      const valueEl = item.querySelector('span');

      if (keyEl && valueEl) {
        const key = keyEl.innerText.trim();
        const value = valueEl.innerText.trim();
        details[key] = value;
      }
    });

    return details;
  });
}

async function scrapeStarRating(page) {
  return await page.evaluate(() => {
    const starContainer = document.querySelector('.review-overview-rating');
    if (!starContainer) return null;

    let fullStars = 0;
    let halfStar = 0;
    let i = 5;

    const stars = starContainer.querySelectorAll('span.icon--star, span.icon--halfstar');

    stars.forEach(star => {
        if (star.classList.contains('checked')) {
            fullStars += i;
        } else if (star.classList.contains('icon--halfstar')) {
            halfStar = 0.5;
        }
        i--;
    });

    return fullStars + halfStar;
  });
}

export async function scrapeBws(page) {
  const productData = await page.evaluate(() => {
    const getText = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.innerText.trim() : null;
    };

    return {
      brand: getText('span[itemprop="brand"] span'),
      name: getText('div[itemprop="name"]'),
      description: getText('p[itemprop="description"]'),
      saving: getText('.badge_title'),
    };
  });

    const additionalDetails = await scrapeAdditionalDetails(page);
    const packOptions = await scrapePackOptions(page);
    const starRating = await scrapeStarRating(page);

  return {
    ...productData,
    additionalDetails,
    packOptions,
    starRating,
  };
}