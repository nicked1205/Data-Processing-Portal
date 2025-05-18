async function scrapeProductColors(page) {
  return await page.evaluate(() => {
    const colors = [];
    const container = document.querySelector('div[data-testid="colour-variant-swatches"]');
    if (!container) return colors;

    const colorImages = container.querySelectorAll('img');
    if (!colorImages) return colors;

    colorImages.forEach(img => {      
      if (img && img.alt) {
        colors.push(img.alt.trim());
      }
    });

    return colors;
  });
}

async function scrapeProductSizes(page) {
    try {
        await page.waitForSelector('button.css-1uwq14b', { visible: true, timeout: 5000 });

        await page.click('button.css-1uwq14b');

        await page.waitForSelector('ul.css-ir31h6', { visible: true, timeout: 5000 });
    } catch (error) {
        return [];
    }
  
    return await page.evaluate(() => {
        const sizes = [];
        const container = document.querySelector('ul.css-ir31h6');
        if (!container) return sizes;

        const sizeEls = container.querySelectorAll('div.css-1g4fjek');
        if (!sizeEls) return sizes;

        sizeEls.forEach(size => {
        if (size) {
            sizes.push(size.innerText.trim());
        }
        });

        return sizes;
    });
}

async function scrapeBadges(page) {
  return await page.evaluate(() => {
    const badges = [];
    const container = document.querySelector('div[data-testid="badge-list"]');
    if (!container) return badges;
    const badgeEls = container.querySelectorAll('p');
    if (!badgeEls) return badges;

    badgeEls.forEach(badge => {
      if (badge) {
        badges.push(badge.innerText.trim());
      }
    });

    return badges;
  });
}

async function scrapeImages(page) {
  return await page.evaluate(() => {
    const images = [];
    const imageElements = document.querySelectorAll('div[data-testid="gallery-grid"] img');

    imageElements.forEach(img => {
      if (img.src) {
        images.push(img.src.trim());
      }
    });

    return images;
  });
}


export async function scrapeTarget(page) {
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
      name: getText('h1.css-1ndntt5'),
      price: getText('span[data-testid="current-price"], span[data-testid="current-range"]'),
      wasPrice: getText('span[data-testid="was-price"], span[data-testid="was-range"]'),
      starRating: getText('p.css-ggtvbt'),
      description: getText('div.css-1xcwvkp'),
    };
  });

  const sizes = await scrapeProductSizes(page);
  const colors = await scrapeProductColors(page);
  const badges = await scrapeBadges(page);
  const imgSources = await scrapeImages(page);

  return {
    ...productData,
    sizes,
    colors,
    badges,
    imgSources,
  };
}