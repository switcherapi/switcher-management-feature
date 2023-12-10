export default {
  '/api/check': {
    get: {
      tags: ['Health Check'],
      summary: 'Check if the API is running.',
      operationId: 'check',
      responses: {
        200: {
          description: 'API is running.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'ok',
                  },
                  releaseTime: {
                    type: 'string',
                    example: 'today',
                  },
                  sslEnabled: {
                    type: 'boolean',
                    example: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
