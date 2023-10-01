import { Context, Router } from '../deps.ts';
import { toFeatureResponseDto, toFeatureRequestDto } from '../dto/mapper.ts';
import FeatureService from '../services/feature.ts';
import { responseError, responseSuccess } from '../utils.ts';
import Validator from '../middleware/validator.ts';

const router = new Router();
const service = new FeatureService();

const { checkBody, hasLenght, required } = Validator;

router.post(
  '/',
  checkBody([
    { key: 'feature', validators: [required()] },
    { key: 'params.value', validators: [hasLenght({ max: 100 })] },
  ]),
  async (context: Context) => {
    try {
      const request = await toFeatureRequestDto(context);
      const status = await service.isFeatureEnabled(request.feature, { value: request?.value });
      responseSuccess(context, toFeatureResponseDto(status));
    } catch (error) {
      responseError(context, error, 500, true);
    }
  },
);

export default router;
