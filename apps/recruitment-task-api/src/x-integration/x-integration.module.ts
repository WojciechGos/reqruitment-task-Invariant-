import { Module } from '@nestjs/common';
import { XIntegrationService } from './x-integration.service';

@Module({
  providers: [XIntegrationService]
})
export class XIntegrationModule {}
