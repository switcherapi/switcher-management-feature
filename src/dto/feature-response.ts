export type ResponseDto = {
  code: number;
  message: string;
};

export type FeatureResponseDto = ResponseDto & {
  status: boolean;
};
