export interface ResponseDto {
  code: number;
  message: string;
}

export interface FeatureResponseDto extends ResponseDto {
  status: boolean;
}
