import { type Context, Router, ValidatorFn, ValidatorMiddleware } from '../deps.ts';
import {
  toFeatureRequestDto,
  toFeatureResponseDto,
  toFeaturesRequestDto,
  toFeaturesResponseDto,
} from '../dto/mapper.ts';
import FeatureService from '../services/feature.ts';
import { responseError, responseSuccess } from '../utils.ts';

const router = new Router();
let service: FeatureService;

const { body, useErrorHandler } = ValidatorMiddleware.createMiddleware();
const { hasLenght, isArray } = ValidatorFn.createValidator();
const featureNameConstraints = [hasLenght({ min: 3 })];
const featureValueConstraints = [hasLenght({ max: 100 })];

useErrorHandler((context: Context, error: string) => {
  return responseError(context, new Error(error), 422);
});

router.post(
  '/',
  body([
    { key: 'feature', validators: featureNameConstraints },
    { key: 'parameters.value', validators: featureValueConstraints, optional: true },
  ]),
  async (context: Context) => {
    try {
      const request = toFeatureRequestDto(context);
      const service = getService();
      const status = await service.isFeatureEnabled(request);

      responseSuccess(context, toFeatureResponseDto(status));
    } catch (error) {
      responseError(context, error as Error, 500, true);
    }
  },
);

router.post(
  '/group',
  body([
    { key: 'features', validators: [isArray({ min: 1 })] },
    { key: 'features.*.feature', validators: featureNameConstraints },
    { key: 'features.*.parameters.value', validators: featureValueConstraints, optional: true },
  ]),
  async (context: Context) => {
    try {
      const request = toFeaturesRequestDto(context);
      const service = getService();
      const statuses = await service.isFeaturesEnabled(request);

      responseSuccess(context, toFeaturesResponseDto(statuses));
    } catch (error) {
      responseError(context, error as Error, 500, true);
    }
  },
);

function getService() {
  if (!service) {
    service = new FeatureService();
  }

  return service;
}

export default router;
