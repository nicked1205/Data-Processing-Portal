async function scrapeProductStarRating(page) {
  return await page.evaluate(() => {
    const starRating = document.querySelector('div.ratings-star span');
    return starRating ? starRating.getAttribute('aria-label') : null;
  });
}

async function scrapeFeatures(page) {
  return await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'));
    const featuresHeading = headings.find(h => h.innerText.trim().toLowerCase() === 'features');
    if (!featuresHeading) return null;

    let container = featuresHeading.nextElementSibling;

    while (container && container.innerText.trim() === '') {
      container = container.nextElementSibling;
    }

    if (!container) return null;

    const bullets = Array.from(container.querySelectorAll('ul li')).map(li => li.innerText.trim());
    const paragraphs = Array.from(container.querySelectorAll('div.whitespace-pre-wrap')).map(p => p.innerText.trim());

    return { bullets, paragraphs };
  });
}

async function expandSpecificationsSection(page) {
  await page.waitForSelector('h1, h2, h3, h4');

  const clicked = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
    const specsHeading = headings.find(h => h.innerText.trim().toLowerCase() === 'specifications');
    if (!specsHeading) return false;

    const btn = specsHeading.querySelector('button');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });

  if (!clicked) {
    throw new Error('Specifications button not found or could not be clicked');
  }

  await page.waitForFunction(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
    const specsHeading = headings.find(h => h.innerText.trim().toLowerCase() === 'specifications');
    if (!specsHeading) return false;

    const container = specsHeading.nextElementSibling;
    return container && container.hasChildNodes();
  }, { timeout: 7000 });
}


async function scrapeSpecifications(page) {
  return await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
    const specsHeading = headings.find(h => h.innerText.trim().toLowerCase() === 'specifications');
    if (!specsHeading) return null;

    let container = specsHeading.nextElementSibling;

    if (!container) return null;

    const specs = {};

    const subSections = Array.from(container.querySelectorAll('h3'));

    subSections.forEach(subHeading => {
      const sectionName = subHeading.innerText.trim();

      let content = subHeading.nextElementSibling;

      if (!content) return;

      const sectionData = {};

      if (sectionName.toLowerCase() === 'dimensions') {
        const divHeaders = content.querySelectorAll('div.grid > p.text-left');
        const dimensions = content.querySelectorAll('div.grid > div p.text-center');

        let productValues = [];
        let packageValues = [];
        let currentLabel = null;

        divHeaders.forEach((div, idx) => {
          const text = div.innerText.trim();
          if (text.toLowerCase() === 'product') currentLabel = 'product';
          else if (text.toLowerCase() === 'package') currentLabel = 'package';
          for (let i = 0; i < 3; i++) {
            const value = dimensions[idx * 3 + i].innerText.trim();
            if (currentLabel === 'product') productValues.push(value);
            else if (currentLabel === 'package') packageValues.push(value);
          }
        });

        if (productValues.length > 0) sectionData['Product Dimensions'] = productValues.join('*');
        if (packageValues.length > 0) sectionData['Package Dimensions'] = packageValues.join('*');
      } else {
        const items = content.querySelectorAll('div');
        items.forEach(item => {
          const bold = item.querySelector('p.font-bold');
          if (bold) {
            const key = bold.innerText.trim();
            const value = item.innerText.replace(bold.innerText, '').trim();
            if (key && value) {
              sectionData[key] = value;
            }
          }
        });

        if (Object.keys(sectionData).length === 0) {
          sectionData['content'] = content.innerText.trim();
        }
      }

      specs[sectionName] = sectionData;
    });

    return specs;
  });
}

async function scrapeImages(page) {
  return await page.evaluate(() => {
    const images = [];
    const imageElements = document.querySelectorAll('button.group/thumbnail img');

    imageElements.forEach(img => {
      if (img.src) {
        images.push(img.src.trim());
      }
    });

    return images;
  });
}

export async function scrapeBunnings(page) {
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
        brand: getText('a[data-locator="product-brand-name"]'),
        name: getText('h1[data-locator="product-title"]'),
        price: getText('p[data-locator="product-price"]'),
        features: getText('div[data-locator="product-features"]'),
        badge: getText('div.pdpBadgeText'),
    };
  });

    const starRating = await scrapeProductStarRating(page);
    const features = await scrapeFeatures(page);
    await expandSpecificationsSection(page);
    const specifications = await scrapeSpecifications(page);
    const imgSources = await scrapeImages(page);

  return {
    ...productData,
    starRating,
    features,
    specifications,
    imgSources,
  };
}