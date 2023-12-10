import { commonSchemaContent } from './common.ts';

export default {
  '/': {
    post: {
      tags: ['Feature'],
      summary: 'Check if a feature is enabled.',
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
};
