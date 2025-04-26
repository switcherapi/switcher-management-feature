export const commonSchemaContent = (ref: string) => ({
  'application/json': {
    schema: {
      $ref: `#/components/schemas/${ref}`,
    },
  },
});