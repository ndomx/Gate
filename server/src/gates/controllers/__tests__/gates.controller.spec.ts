import { Test } from '@nestjs/testing';
import { OpenGateRequestDto } from '../../dtos/request/open-gate-request.dto';
import { OpenGateResponseDto } from '../../dtos/response/open-gate-response.dto';
import { GatesService } from '../../services/gates.service';
import { GatesController } from '../gates.controller';

const mockGatesService = {
  requestAccess: jest.fn(() => Promise.resolve(new OpenGateResponseDto())),
};

describe('GatesController', () => {
  let controller: GatesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: GatesService,
          useValue: mockGatesService,
        },
      ],
      controllers: [GatesController],
    }).compile();

    controller = await module.resolve(GatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('openGate()', () => {
    describe('when request is valid', () => {
      const request: OpenGateRequestDto = {
        timestamp: Date.now(),
        userId: '<user-id>',
        deviceId: '<device-id>',
        rootId: '<root-id>',
      };

      mockGatesService.requestAccess.mockResolvedValueOnce(
        new OpenGateResponseDto(),
      );

      it('returns an instance of OpenGateResponseDto', async () => {
        const response = await controller.openGate(request);
        expect(response).toBeInstanceOf(OpenGateResponseDto);
      });
    });
  });
});
