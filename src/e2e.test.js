import puppeteer from "puppeteer";

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("contains the welcome text", async () => {
    
    await page.waitForSelector(".App-welcome-text");
    await expect(page.title()).resolves.toMatch('Imedia24 Pokemons');
  });

  afterAll(() => browser.close());
});


// I got and error i couldnt solve net::ERR_CONNECTION_REFUSED at http://localhost:3000, i dont why 
// I used to use Protractor for Angular here to take a look https://github.com/Ouokki/MockupToHtmlCss/tree/master/client