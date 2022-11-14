import { Injectable, Logger } from '@nestjs/common';
import { ProductService } from '../product/services/product.service';
import * as puppeteer from 'puppeteer'

@Injectable()
export class ScraperService {

    private readonly logger: Logger = new Logger('SCRAPER-SERVICE')

    constructor(
        private readonly productService: ProductService
    ){}
    
    async getDns() {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 30, // замедляет работу браузера
            ignoreHTTPSErrors: true,
            args: [
              `--window-size=1920,1080`
            ],
            defaultViewport: {
              width: 1920,
              height: 1080
            }
          });
        
            const articul = `82A200F1RU`
            const dnsPage = await browser.newPage()
            await dnsPage.goto(`https://www.dns-shop.ru/search/?q=${articul}`)
    
            let price = await dnsPage.evaluate(() => {
                return Array.from(document.querySelectorAll('.product-buy__price').values()).map(el => el.textContent)
            })
            this.logger.log(`Цена: ${price[0]}`)
            await dnsPage.click('.product-characteristics__footer > button')
            let gabarit = await dnsPage.evaluate(() => {
                return Array.from(document.querySelectorAll('.product-characteristics__spec ')).map(el => el.textContent)  
                
            })
            let photo = await dnsPage.evaluate(() =>{
                return Array.from(document.querySelectorAll('.product-images-slider__img[src]')).map(el => el.getAttribute('src'))
            })
            this.logger.log(`Фото: ${photo[0]}`)
            this.logger.log(`Фото: ${gabarit}`)
            return {price: price[0], photo: photo[0], gabarit: gabarit}
    }

}
