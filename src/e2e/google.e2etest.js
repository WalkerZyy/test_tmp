import puppeteer from 'puppeteer';

let browser, page

describe('Google', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage()
        await page.goto('https://google.com')
    })
  
    it('should display "google" text on page', async () => {
        await expect(page).toMatch('google')
    })
  })