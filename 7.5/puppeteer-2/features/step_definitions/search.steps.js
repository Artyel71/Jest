const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { putText, getText, days, movieTime, seats,clickElement,
 } = require("../../lib/commands.js");

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
  return await this.page.goto(`http://qamid.tmweb.ru/client/index.php${string}`, {
    setTimeout: 20000,
  });
});

When("user choose day {string}", async function (string) {
  return await days(this.page, string);
});

When(
  "user choose movie {string} and movieTime {string}",
  async function (string, string2) {
    return await movieTime(this.page, string, string2);
  }
);

When(
  "user choose seats row {string} and seat {string}",
  async function (string, string2) {
    return await seats(this.page, string, string2);
  }
);

When("user click book {string}", async function (string) {
  return await clickElement(this.page, string);
});

Then("user sees booking confirmation {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user sees the header {string}", async function (string) {
  const actual = await getText(this.page, "h2");
  const expected = await string;
  expect(actual).contains(expected);
});

Then(
  "user sees {string} is not clickable",
  async function (string) {
    const acceptionButton = await this.page.$eval(
      "button",
      (button) => button.disabled
    );
    await expect(acceptionButton).to.be.true;
  }
);