async function scrapeProductStarRating(page) {
  return await page.evaluate(() => {
    const starRating = document.querySelector('div[class^="styles__RatingWrapper"] div');
    return starRating ? starRating.getAttribute('aria-label') : null;
  });
}

async function scrapeImages(page) {
  return await page.evaluate(() => {
    const images = [];
    const imageElements = document.querySelectorAll('div[aria-label="Slider Page"] img');

    imageElements.forEach(img => {
      if (img.src) {
        images.push(img.src.trim());
      }
    });

    return images;
  });
}

async function scrapeSpecificationsByCategory(page) {
  return await page.evaluate(() => {
    const categories = {};

    const categorySections = document.querySelectorAll('div.sc-cbPlza');

    categorySections.forEach(section => {
      const categoryTitleEl = section.querySelector('h3');
      if (!categoryTitleEl) return;

      const categoryTitle = categoryTitleEl.innerText.trim();
      const specs = {};

      const dlElements = section.querySelectorAll('dl');

      dlElements.forEach(dl => {
        const keyEl = dl.querySelector('dt');
        const valueEl = dl.querySelector('dd');
        if (keyEl && valueEl) {
          const key = keyEl.innerText.trim();
          const value = valueEl.innerText.trim();
          specs[key] = value;
        }
      });

      categories[categoryTitle] = specs;
    });

    return categories;
  });
}

async function scrapeProductOptions(page) {
  return await page.evaluate(() => {
    const options = {};

    // Function to get text or alt from elements
    const getOption = (section) => {
      const optionsList = [];
      const items = section.querySelectorAll('ul[role="list"] li div a');

      items.forEach(item => {
        const textEl = item.querySelector('div');
        const imgEl = item.querySelector('img');
        
        if (textEl) {
          optionsList.push(textEl.innerText.trim());
        } 
        else if (imgEl && imgEl.alt) {
          optionsList.push(imgEl.alt.trim());
        }
      });

      return optionsList;
    };

    const sections = document.querySelectorAll('section[aria-label]');

    sections.forEach(section => {
      const label = section.getAttribute('aria-label');
      const optionList = getOption(section);
      
      if (optionList.length > 0) {
        options[label] = optionList;
      }
    });

    return options;
  });
}

async function scrapeBadge(page) {
  return await page.evaluate(() => {
    const badge = document.querySelector('div.sc-dLMFU img');
    if (badge && badge.alt) {
      return badge.alt.replace('dinkus', '').trim();
    }
    return null;
  });
}

export async function scrapeOfficeworks(page) {
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
        brand: getText('div[class^="style__Detail"]'),
        name: getText('div[class^="style__ProductTitleContainer"] h1'),
        price: getText('div[class^="style__StyledPrice"]'),
        features: getText('div[data-ref="features"]'),
    };
  });

    const starRating = await scrapeProductStarRating(page);
    const specifications = await scrapeSpecificationsByCategory(page);
    const options = await scrapeProductOptions(page);
    const badge = await scrapeBadge(page);
    const imgSources = await scrapeImages(page);

  return {
    ...productData,
    starRating,
    options,
    badge,
    specifications,
    imgSources,
  };
}