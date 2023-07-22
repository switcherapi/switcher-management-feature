import { Context, Router } from '../deps.ts';
import { FeatureResponseDto } from '../dto/feature-response.ts';
import { requestSanitizer } from '../middleware/index.ts';
import service from '../services/feature.ts';
import { responseError, responseSuccess } from '../utils.ts';

const router = new Router();

router.post('/', requestSanitizer, async (context: Context) => {
  try {
    const status = await service.isFeatureEnabled(context.state.request.feature, context.state.request?.value);
    responseSuccess(context, { status } as FeatureResponseDto);
  } catch (error) {
    responseError(context, error, 500);
  }
});

export default router;
