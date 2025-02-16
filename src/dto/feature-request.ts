export type FeatureRequestDto = {
  feature: string;
  parameters?: {
    value: string;
  };
};

export type FeaturesRequestDto = {
  features: FeatureRequestDto[];
};
