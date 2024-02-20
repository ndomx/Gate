import { ConfigService } from '@nestjs/config';
import { BaseApiKeyGuard } from './base-api-key.guard';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersApiKeyGuard extends BaseApiKeyGuard {
  constructor(configService: ConfigService) {
    super(configService);
  }

  protected loadApiKey(): string {
    return this.configService.get('API_USERS_KEY');
  }
}
