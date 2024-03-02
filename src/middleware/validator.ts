import { Context, Next } from '../deps.ts';
import { responseError } from '../utils.ts';

type ValidatorFunction = (value: string, key: string, context: Context) => boolean;

interface LenghtValidation {
  min?: number;
  max?: number;
}

interface ValidatorParams {
  key: string;
  validators: ValidatorFunction[];
}

export default class Validator {
  static checkBody(args: ValidatorParams[]) {
    return async (context: Context, next: Next) => {
      const body = await context.request.body.text();

      if (!body) {
        return responseError(context, new Error('Invalid request body'), 400);
      }

      context.state.request_body = JSON.parse(body);
      for (const arg of args) {
        const value = arg.key.split('.').reduce((o, i) => {
          if (o) return o[i];
        }, context.state.request_body);

        for (const validator of arg.validators) {
          if (!validator(value, arg.key, context)) {
            return false;
          }
        }
      }

      return await next();
    };
  }

  static required() {
    return (value: string, key: string, context: Context) => {
      if (!value) {
        return responseError(context, new Error(`Invalid ${key} input. Cause: it is empty.`), 400);
      }

      return true;
    };
  }

  static hasLenght(lengthValidation: LenghtValidation) {
    return (value: string, key: string, context: Context) => {
      if (!value) {
        return true;
      }

      if (lengthValidation.max && value.length > lengthValidation.max) {
        return responseError(
          context,
          new Error(`Invalid ${key} input. Cause: it is greater than ${lengthValidation.max} characters.`),
          422,
        );
      }

      return true;
    };
  }
}
