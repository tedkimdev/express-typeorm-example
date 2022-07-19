/* eslint-disable indent */
import { IsNumber, IsOptional, IsString, IsUppercase, Length } from "class-validator";
import { CarEntity } from "../../entities/car.entities";
import { BaseOutput } from "../common/output.dto";

export class CreateCarInput {
  @IsString()
  @Length(7, 7)
  plate: string;

  @IsString()
  @Length(7, 7)
  registration: string;

  @IsString()
  @Length(2, 2)
  @IsUppercase()
  registrationState: string;

  @IsString()
  color: string;

  @IsString()
  @Length(10) // MM/DD/YYYY
  registrationExpirationDate: string;

  @IsString()
  name: string;

  @IsString()
  @Length(17, 17)
  vehicleIdentificationNumber: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  mileage: number;

  @IsNumber()
  value: number;
}

export class CreateCarOutput extends BaseOutput {
  data?: CarEntity;
}
