import { bold, type Context } from './deps.ts';
import type { ResponseDto } from './dto/feature-response.ts';

const Level = Object.freeze({
  INFO: 0,
  DEBUG: 1,
  ERROR: 2,
});

export const responseSuccess = ({ response }: Context, body: ResponseDto) => {
  response.status = 200;
  response.body = body;
};

export const responseError = ({ response }: Context, error: Error, code: number, showStack?: boolean) => {
  logger('ERROR', 'Route', error, showStack);
  response.status = code;
  response.body = { error: error.message };
  return false;
};

export const logger = (level: string, component: string, content: string | object, showStack?: boolean) => {
  let data;

  const currentLevel = getEnv('LOG_LEVEL', 'INFO');
  const levels = Object.keys(Level);
  const currentLevelIndex = levels.indexOf(currentLevel);
  const levelIndex = levels.indexOf(level);

  if (currentLevelIndex >= levelIndex || levelIndex === Level.ERROR) {
    if (content instanceof Error) {
      if (showStack) {
        console.log(content.stack);
      }

      content = content.message;
    } else if (typeof content === 'object') {
      content = JSON.stringify(content, null, 2);
    }

    data = `${bold(levels[levelIndex])} ${component}: ${content}`;
    console.log(data);
  }

  return data;
};

export function getEnv<T>(key: string, or: T): T {
  if (typeof or === 'boolean') {
    return Boolean(Deno.env.get(key) === 'true') as T;
  }

  return Deno.env.get(key) as T || or;
}
