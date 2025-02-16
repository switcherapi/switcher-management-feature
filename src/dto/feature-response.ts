export type ResponseDto = {
  code: number;
  message: string;
};

export type FeatureResponseDto = ResponseDto & {
  status: boolean;
};

export type FeaturesResponseDto = ResponseDto & {
  features: {
    feature: string;
    status: boolean;
  }[];
};
