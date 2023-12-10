import info from './swagger-info.ts';
import pathApi from './paths/path-api.ts';
import pathFeature from './paths/path-feature.ts';
import featureScehma from './schemas/feature.ts';

export default {
  openapi: '3.0.1',
  info,
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Local',
    },
    {
      url: 'https://switcherapi.com/feature',
      description: 'Cloud API',
    },
  ],
  components: {
    schemas: {
      ...featureScehma,
    },
  },
  paths: {
    ...pathApi,
    ...pathFeature,
  },
};
