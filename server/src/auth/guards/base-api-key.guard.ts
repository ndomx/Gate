import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export abstract class BaseApiKeyGuard implements CanActivate {
  constructor(protected readonly configService: ConfigService) {}

  protected abstract loadApiKey(): string;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      return false;
    }

    return this.loadApiKey() === apiKey;
  }
}
