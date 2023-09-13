module.exports = {
    findAndClickElement: async function (page, selector) {
      try {
        await page.waitForSelector(selector);
        await page.click(selector);
      } catch (error) {
        throw new Error(`Something goes wrong with selector: ${selector}`);
      }
    },
    getText: async function (page, selector) {
      try {
        await page.waitForSelector(selector);
        return await page.$eval(selector, (link) => link.textContent);
      } catch (error) {
        throw new Error(`Something goes wrong with text for selector: ${selector}`);
      }
    },
  };