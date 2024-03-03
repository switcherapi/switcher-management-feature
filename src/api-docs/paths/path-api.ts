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
                    enum: ['ok'],
                  },
                  releaseTime: {
                    type: 'string',
                    description: 'Release time of the API.',
                  },
                  sslEnabled: {
                    type: 'boolean',
                    description: 'Is SSL enabled?',
                  },
                  rateLimit: {
                    type: 'object',
                    properties: {
                      window: {
                        type: 'string',
                        description: 'Rate limit window.',
                      },
                      max: {
                        type: 'string',
                        description: 'Rate limit max.',
                      },
                    },
                  },
                  switcherSettings: {
                    type: 'object',
                    properties: {
                      url: {
                        type: 'string',
                        description: 'Switcher API URL.',
                      },
                      environment: {
                        type: 'string',
                        description: 'Switcher environment.',
                      },
                      local: {
                        type: 'string',
                        description: 'Switcher local.',
                      },
                      snapshotAutoLoad: {
                        type: 'string',
                        description: 'Switcher snapshot auto load.',
                      },
                      snapshotUpdateInterval: {
                        type: 'string',
                        description: 'Switcher snapshot update interval.',
                      },
                    },
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
