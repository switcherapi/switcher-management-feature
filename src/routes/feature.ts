import { Context, Router, ValidatorFn, ValidatorMiddleware } from '../deps.ts';
import { toFeatureRequestDto, toFeatureResponseDto } from '../dto/mapper.ts';
import FeatureService from '../services/feature.ts';
import { responseError, responseSuccess } from '../utils.ts';

const router = new Router();
let service: FeatureService;

const { body, useErrorHandler } = ValidatorMiddleware.createMiddleware();
const { hasLenght } = ValidatorFn.createValidator();

useErrorHandler((context: Context, error: string) => {
  return responseError(context, new Error(error), 422);
});

router.post(
  '/',
  body([
    { key: 'feature' },
    { key: 'parameters.value', validators: [hasLenght({ max: 100 })], optional: true },
  ]),
  async (context: Context) => {
    try {
      const request = toFeatureRequestDto(context);
      const status = await getService().isFeatureEnabled(request.feature, { value: request?.value });
      responseSuccess(context, toFeatureResponseDto(status));
    } catch (error) {
      responseError(context, error, 500, true);
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
