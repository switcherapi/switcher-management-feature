export default {
  FeatureRequest: {
    type: 'object',
    properties: {
      feature: {
        type: 'string',
        example: 'feature',
      },
      parameters: {
        type: 'object',
        properties: {
          value: {
            type: 'string',
            example: 'value',
          },
        },
      },
    },
  },
  FeatureResponse: {
    type: 'object',
    properties: {
      code: {
        type: 'number',
        example: 200,
      },
      message: {
        type: 'string',
        example: 'success',
      },
      status: {
        type: 'boolean',
        example: true,
      },
    },
  },
  ErrorResponse: {
    type: 'object',
    properties: {
      error: {
        type: 'string',
        example: 'Something went wrong: {...}',
      },
    },
  },
};
