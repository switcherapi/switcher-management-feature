export const commonSchemaContent = (ref: string) => ({
  'application/json': {
    schema: {
      $ref: `#/components/schemas/${ref}`,
    },
  },
});

export const commonArraySchemaContent = (ref: string) => ({
  'application/json': {
    schema: {
      type: 'array',
      items: {
        $ref: `#/components/schemas/${ref}`,
      },
    },
  },
});

export const commonOneOfSchemaContent = (refs: string[]) => ({
  'application/json': {
    schema: {
      oneOf: refs.map((ref) => ({
        $ref: `#/components/schemas/${ref}`,
      })),
    },
  },
});
