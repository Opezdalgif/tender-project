import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
    constructor(
        private readonly scraperService: ScraperService
    ){}

    @Get('/dns')
    getDns() {
        return this.scraperService.getDns()
    }
}
