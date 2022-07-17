import { IsNumber, IsOptional, IsString, IsUppercase, Length } from "class-validator";
import { CarEntity } from "../../entities/car.entities";
import { BaseOutput } from "../common/output.dto";

export class UpdateCarsInput {
  @IsString()
  @Length(7, 7)
  @IsOptional()
  plate?: string;

  @IsString()
  @Length(7, 7)
  @IsOptional()
  registration?: string;

  @IsString()
  @Length(2, 2)
  @IsUppercase()
  @IsOptional()
  registrationState?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @Length(10) // MM/DD/YYYY
  @IsOptional()
  registrationExpirationDate?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @Length(17, 17)
  @IsOptional()
  vehicleIdentificationNumber?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  mileage?: number;

  @IsNumber()
  @IsOptional()
  value?: number;
}

export class UpdateCarOutput extends BaseOutput {
  data?: CarEntity;
}