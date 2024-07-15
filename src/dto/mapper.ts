import type { Context } from '../deps.ts';
import type { FeatureRequestDto } from './feature-request.ts';
import type { FeatureResponseDto } from './feature-response.ts';

export function toFeatureResponseDto(status: boolean): FeatureResponseDto {
  return {
    code: 200,
    message: 'success',
    status,
  };
}

export function toFeatureRequestDto(context: Context): FeatureRequestDto {
  const reqBody = context.state.request_body;
  return {
    feature: decodeURIComponent(reqBody.feature),
    value: decodeURIComponent(reqBody.parameters?.value),
  };
}
