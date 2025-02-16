import type { Context } from '../deps.ts';
import type { FeatureRequestDto, FeaturesRequestDto } from './feature-request.ts';
import type { FeatureResponseDto, FeaturesResponseDto } from './feature-response.ts';

export function toFeatureResponseDto(result: boolean): FeatureResponseDto {
  return {
    code: 200,
    message: 'success',
    status: result,
  };
}

export function toFeaturesResponseDto(results: {
  feature: string;
  result: boolean;
}[]): FeaturesResponseDto {
  return {
    code: 200,
    message: 'success',
    features: results.map((response) => ({
      feature: response.feature,
      status: response.result,
    })),
  };
}

export function toFeatureRequestDto(context: Context): FeatureRequestDto {
  const reqBody = context.state.request_body;
  return decodedFeatureDto(reqBody);
}

export function toFeaturesRequestDto(context: Context): FeaturesRequestDto {
  const reqBody = context.state.request_body;
  return {
    features: reqBody.features.map((featureReq: FeatureRequestDto) => decodedFeatureDto(featureReq)),
  };
}

function decodedFeatureDto(featureReq: FeatureRequestDto) {
  return {
    feature: decodeURIComponent(featureReq.feature),
    parameters: {
      value: decodeURIComponent(featureReq.parameters?.value ?? ''),
    },
  };
}
