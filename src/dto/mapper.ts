import { Context } from '../deps.ts';
import { FeatureRequestDto } from './feature-request.ts';
import { FeatureResponseDto } from './feature-response.ts';

export function toFeatureResponseDto(status: boolean): FeatureResponseDto {
  return {
    code: 200,
    message: 'success',
    status,
  };
}

export async function toFeatureRequestDto(context: Context): Promise<FeatureRequestDto> {
  const reqBody = await context.request.body({ type: 'json' }).value;
  return {
    feature: decodeURIComponent(reqBody.feature),
    value: decodeURIComponent(reqBody.params?.value),
  };
}
