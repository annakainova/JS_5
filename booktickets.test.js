const { findAndClickElement, getText } = require("./lib/commands");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

test("Check succesfully booking one ticket", async () => {
  findAndClickElement(page, ".page-nav > a:nth-child(5)");
  findAndClickElement(page, "a.movie-seances__time");
  findAndClickElement(page, ".buying-scheme__row > span:nth-child(1)");
  findAndClickElement(page, "button.acceptin-button");
  findAndClickElement(page, "button.acceptin-button");
  const actual = await getText(page, "p.ticket__hint");
  expect(actual).toContain(
    "Покажите QR-код нашему контроллеру для подтверждения бронирования."
  );
}, 25000);

test("Check succesfully booking two ticket", async () => {
  findAndClickElement(page, ".page-nav > a:nth-child(5)");
  findAndClickElement(page, "a.movie-seances__time");
  findAndClickElement(page, ".buying-scheme__row > span:nth-child(3)");
  findAndClickElement(page, ".buying-scheme__row > span:nth-child(4)");
  findAndClickElement(page, "button.acceptin-button");
  findAndClickElement(page, "button.acceptin-button");
  const actual = await getText(page, "p.ticket__hint");
  expect(actual).toContain(
    "Покажите QR-код нашему контроллеру для подтверждения бронирования."
  );
}, 25000);

test("Check unsuccesfully booking already booked ticket", async () => {
  findAndClickElement(page, ".page-nav > a:nth-child(5)");
  findAndClickElement(page, "a.movie-seances__time");
  findAndClickElement(page, ".buying-scheme__row > span:nth-child(1)");
  expect(
    String(
      await page.$eval("button", (button) => {
        return button.disabled;
      })
    )
  ).toContain("true");
}, 25000);
