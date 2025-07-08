export type FeatureRequestDto = {
  feature: string;
  parameters?: {
    value?: string;
    number?: string;
    date?: string;
    time?: string;
    payload?: string;
    regex?: string;
    network?: string;
  };
};

export type FeaturesRequestDto = {
  features: FeatureRequestDto[];
};
