import { commonSchemaContent } from './common.ts';

export default {
  '/': {
    post: {
      tags: ['Feature'],
      summary: 'Check a single feature status.',
      operationId: 'feature',
      requestBody: {
        content: commonSchemaContent('FeatureRequest'),
      },
      responses: {
        200: {
          description: 'Feature status.',
          content: commonSchemaContent('FeatureResponse'),
        },
        500: {
          description: 'Internal server error.',
          content: commonSchemaContent('ErrorResponse'),
        },
      },
    },
  },
  '/group': {
    post: {
      tags: ['Feature'],
      summary: 'Check multiple features status.',
      operationId: 'featureGroup',
      requestBody: {
        content: commonSchemaContent('FeaturesRequest'),
      },
      responses: {
        200: {
          description: 'Features status.',
          content: commonSchemaContent('FeaturesResponse'),
        },
        500: {
          description: 'Internal server error.',
          content: commonSchemaContent('ErrorResponse'),
        },
      },
    },
  },
};
