import { Module } from '@nestjs/common';
import { TwitterIntegrationService } from './twitter-integration.service';

@Module({
    providers: [TwitterIntegrationService],
    exports: [TwitterIntegrationService]
})
export class TwitterIntegrationModule {

}
