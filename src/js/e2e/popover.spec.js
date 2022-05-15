import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);


describe('popover test', () => {
    let browser = null;
    let page = null;
    let server = null;
    const baseURL = 'http://localhost:9000';

    beforeAll(async() => {
        server = fork(`${__dirname}/e2e.server.js`);
        await new Promise((resolve, reject) => {
            server.on('error', reject);
            server.on('message', (message) => {
                if(message === 'ok') {
                    resolve();
                }
            })
        })

        browser = await puppeteer.launch({
            headless: false,
            slowMo: 200,
        })

        page = await browser.newPage();
    })

    afterAll(async () => {
        await browser.close();
        server.kill();
    })

    test('test', async () => {
        await page.goto(baseURL);
        const arrBtns = await page.$('[data-hint="Подсказка 1"]');
        await arrBtns.click();
        await page.waitForSelector('[data-popover="popover"].off');
    })
})