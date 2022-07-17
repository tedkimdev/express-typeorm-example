import { IsOptional, IsString } from "class-validator";

export class GetCarsInput {
  @IsString()
  @IsOptional()
  registrationState?: string;

  @IsString()
  @IsOptional()
  color?: string;
}