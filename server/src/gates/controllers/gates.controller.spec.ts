import { Test, TestingModule } from '@nestjs/testing';
import { GatesController } from './gates.controller';
import { GatesService } from '../services/gates.service';

const gatesServiceMock = {
  activateDevice: jest.fn(),
};

describe('GatesController', () => {
  let controller: GatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatesController],
      providers: [
        {
          provide: GatesService,
          useValue: gatesServiceMock,
        },
      ],
    }).compile();

    controller = module.get<GatesController>(GatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('activateDevice()', () => {
    const deviceId = '123';
    const userId = '123as';

    it('calls service.activateDevice', async () => {
      await controller.activateDevice(deviceId, { action: 'on' }, userId);
      expect(gatesServiceMock.activateDevice).toHaveBeenCalledWith(
        deviceId,
        userId,
      );
    });
  });
});
