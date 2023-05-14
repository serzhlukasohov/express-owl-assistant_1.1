// @ts-ignore
import Spider from 'node-spider';
// @ts-ignore
import TurndownService from 'turndown';
import * as cheerio from 'cheerio';
const turndownService = new TurndownService();
class Crawler {
    constructor(urls, limit = 1000, textLengthMinimum = 200) {
        Object.defineProperty(this, "pages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "limit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1000
        });
        Object.defineProperty(this, "urls", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "spider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "count", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "textLengthMinimum", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 200
        });
        Object.defineProperty(this, "handleRequest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (doc) => {
                const $ = cheerio.load(doc.res.body);
                // Remove obviously superfulous elements
                $('script').remove();
                $('header').remove();
                $('nav').remove();
                const title = $('title').text() || '';
                const html = $('body').html();
                const text = turndownService.turndown(html || '');
                const page = {
                    url: doc.url,
                    text,
                    title,
                };
                if (text.length > this.textLengthMinimum) {
                    this.pages.push(page);
                }
                doc.$('a').each((_i, elem) => {
                    const href = doc.$(elem).attr('href')?.split('#')[0];
                    const url = href && doc.resolve(href);
                    // crawl more
                    if (url && this.urls.some((u) => url.includes(u)) && this.count < this.limit) {
                        this.spider.queue(url, this.handleRequest);
                        this.count += 1;
                    }
                });
            }
        });
        Object.defineProperty(this, "start", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                this.pages = [];
                return new Promise((resolve, reject) => {
                    this.spider = new Spider({
                        concurrent: 5,
                        delay: 0,
                        allowDuplicates: false,
                        catchErrors: true,
                        addReferrer: false,
                        xhr: false,
                        keepAlive: false,
                        error: (err, url) => {
                            console.log(err, url);
                            reject(err);
                        },
                        // Called when there are no more requests
                        done: () => {
                            resolve(this.pages);
                        },
                        headers: { 'user-agent': 'node-spider' },
                        encoding: 'utf8',
                    });
                    this.urls.forEach((url) => {
                        this.spider.queue(url, this.handleRequest);
                    });
                });
            }
        });
        this.urls = urls;
        this.limit = limit;
        this.textLengthMinimum = textLengthMinimum;
        this.count = 0;
        this.pages = [];
        this.spider = {};
    }
}
export { Crawler };
//# sourceMappingURL=crawler.js.map