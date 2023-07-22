import { bold, Context } from './deps.ts';
import { ResponseDto } from './dto/feature-response.ts';

export const responseSuccess = ({ response }: Context, body: ResponseDto) => {
  response.status = body.code || 200;
  response.body = body;
};

export const responseError = ({ response }: Context, error: Error, code: number) => {
  console.log(`${bold('Error')} ${error.message}`);
  response.status = code;
  response.body = { error: error.message };
};
