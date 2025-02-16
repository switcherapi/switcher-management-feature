const featureRequest = {
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
};

const featureResponse = {
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
};

const featuresRequest = {
  type: 'object',
  properties: {
    features: {
      type: 'array',
      items: featureRequest,
    },
  },
};

const featuresResponse = {
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
    features: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          feature: {
            type: 'string',
            example: 'feature',
          },
          status: {
            type: 'boolean',
            example: true,
          },
        },
      },
    },
  },
};

export default {
  FeatureRequest: featureRequest,
  FeatureResponse: featureResponse,
  FeaturesRequest: featuresRequest,
  FeaturesResponse: featuresResponse,
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
