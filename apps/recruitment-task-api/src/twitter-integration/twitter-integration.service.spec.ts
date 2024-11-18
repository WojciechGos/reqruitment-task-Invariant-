import { Test, TestingModule } from '@nestjs/testing';
import { TwitterIntegrationService } from './twitter-integration.service';

describe('TwitterIntegrationService', () => {
  let service: TwitterIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitterIntegrationService],
    }).compile();

    service = module.get<TwitterIntegrationService>(TwitterIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
