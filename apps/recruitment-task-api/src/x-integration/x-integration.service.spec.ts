import { Test, TestingModule } from '@nestjs/testing';
import { XIntegrationService } from './x-integration.service';

describe('XIntegrationService', () => {
  let service: XIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XIntegrationService],
    }).compile();

    service = module.get<XIntegrationService>(XIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
