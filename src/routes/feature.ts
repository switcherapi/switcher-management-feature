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

const { body, check, useErrorHandler } = ValidatorMiddleware.createMiddleware();
const { hasLenght, isArray } = ValidatorFn.createValidator();
const featureNameConstraints = [hasLenght({ min: 3 })];
const featureValueConstraints = [hasLenght({ max: 100 })];

useErrorHandler((context: Context, error: string) => {
  return responseError(context, new Error(error), 422);
});

router.post(
  '/',
  body(
    check('feature').ifValue(...featureNameConstraints),
    check('parameters.value').maybe().ifValue(...featureValueConstraints),
  ),
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
  body(
    check('features').ifValue(isArray({ min: 1 })),
    check('features.*.feature').ifValue(...featureNameConstraints),
    check('features.*.parameters.value').maybe().ifValue(...featureValueConstraints),
  ),
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
