import { bold, Context, cyan, green, Next } from '../deps.ts';
import { responseError } from '../utils.ts';

export const responseTime = async (context: Context, next: Next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  context.response.headers.set('X-Response-Time', `${ms}ms`);
};

export const responseTimeLog = async (context: Context, next: Next) => {
  await next();
  const rt = context.response.headers.get('X-Response-Time');
  console.log(
    `${green(context.request.method)} ${cyan(decodeURIComponent(context.request.url.pathname))} - ${bold(String(rt))}`,
  );
};

export const requestSanitizer = async (context: Context, next: Next) => {
  const reqBody = await context.request.body({ type: 'json' }).value;

  if (!reqBody.feature) {
    return responseError(context, new Error('Feature name is required'), 400);
  }

  context.state.request = {
    feature: decodeURIComponent(reqBody.feature),
    params: decodeURIComponent(reqBody.params?.value),
  };

  await next();
};
