import { Context, Router } from '../deps.ts';

const router = new Router();

router.get('/api/check', ({ response }: Context) => {
  try {
    response.status = 200;
    response.body = {
      message: 'Success',
    };
  } catch (e) {
    response.status = 500;
    response.body = {
      message: `Something went wrong - ${e.message}`,
    };
  }
});

export default router;
