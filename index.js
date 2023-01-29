import puppeteer from "puppeteer";
import alert from "alert";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.mercadolibre.com.mx/");

  // Set viewport width and height
  await page.setViewport({ width: 1280, height: 720 });

  // Type into search box
  await page.type(".nav-search-input", "samsung");

  // Wait and click on search button
  const searchResultSelector = ".nav-search-btn";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Wait and click on first result
  const findFirstResult =
    // "a > .ui-search-result__content-wrapper > .ui-search-item__group > .ui-search-item__title";
    "a > .ui-search-item__title";
    await page.waitForSelector(findFirstResult);
  await page.click(findFirstResult);

  // Screenshot page
  await page.screenshot({ path: "screenshot.png" });

  // Get the product price
  const findPrice = "div > .andes-money-amount > .andes-money-amount__fraction";
  await page.waitForSelector(findPrice);

  const info = await page.evaluate((findPrice) => {
    const array = Array.from(document.querySelectorAll(findPrice));
    let prices = [];
    array.forEach((price) => {
      price = price.innerHTML;
      prices.push(price);
    });

    return prices;
  }, findPrice);

  alert(`El precio del producto que acaba de ver es: $${info[1]}`);

  await browser.close();
})();
