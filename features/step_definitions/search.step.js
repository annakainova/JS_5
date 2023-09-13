const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { findAndClickElement, getText } = require("../../lib/commands");
setDefaultTimeout(60000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 60000,
  });
});
When("user choose day", async function () {
  await findAndClickElement(this.page, ".page-nav > a:nth-child(5)");
});
When("user choose time", async function () {
  await findAndClickElement(this.page, "a.movie-seances__time");
});
When("user select 1 row 5 seat", async function () {
  await findAndClickElement(
    this.page,
    ".buying-scheme__row > span:nth-child(5)"
  );
});
When("user select 1 row 6 seat", async function () {
  await findAndClickElement(
    this.page,
    ".buying-scheme__row > span:nth-child(6)"
  );
});
When("user select 1 row 7 seat", async function () {
  await findAndClickElement(
    this.page,
    ".buying-scheme__row > span:nth-child(7)"
  );
});
When("user select the booked place", async function () {
  await findAndClickElement(
    this.page,
    ".buying-scheme__row > span:nth-child(5)"
  );
});
When("user click bookButton", async function () {
  await findAndClickElement(this.page, "button.acceptin-button");
});
When("user click QRButton", async function () {
  await findAndClickElement(this.page, "button.acceptin-button");
});
Then("user see text {string}", async function (string) {
  const actual = await getText(this.page, "p.ticket__hint");
  const expected = await string;
  expect(actual).contains(expected);
});
Then("user see that button disabled {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).contains(expected);
});
