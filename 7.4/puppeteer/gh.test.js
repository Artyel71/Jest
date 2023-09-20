let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub",{timeout: 60000});
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content",{timeout: 60000});
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team", {timeout: 60000})
  });
});

describe("Another github page tests", () => {
  
  test("The Features page", async () => {
    await page.goto("https://github.com/features");
    const titleFeatures = await page.title();
    expect(titleFeatures).toEqual("Features | GitHub · GitHub", {timeout: 60000});
  });

  test("About page", async () => {
    await page.goto("https://github.com/about");
    const titleCodespace = await page.title();
    expect(titleCodespace).toEqual("About · GitHub", {timeout: 60000})
  });

  
  test("The pricing page", async () => {
    await page.goto("https://github.com/pricing");
    const titlePricing = await page.title();
    expect(titlePricing).toEqual("Pricing · Plans for every developer · GitHub", {timeout: 60000})
  });

  test("The enterprise page", async () => {
    await page.goto("https://github.com/enterprise");
    const titleEnterprise = await page.title();
    expect(titleEnterprise).toEqual("Enterprise · A smarter way to work together · GitHub", {timeout: 60000})
  });
});
