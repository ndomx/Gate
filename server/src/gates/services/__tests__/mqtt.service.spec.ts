import { Test } from '@nestjs/testing';
import { MqttService } from '../mqtt.service';

describe('MqttService', () => {
  let service: MqttService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MqttService],
    }).compile();

    service = await module.resolve(MqttService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
