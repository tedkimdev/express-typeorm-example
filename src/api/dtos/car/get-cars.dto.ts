/* eslint-disable indent */
import { IsOptional, IsString } from "class-validator";
import { CarEntity } from "../../entities/car.entities";
import { BaseOutput } from "../common/output.dto";

export class GetCarsInput {
  @IsString()
  @IsOptional()
  registrationState?: string;

  @IsString()
  @IsOptional()
  color?: string;
}

export class GetCarsOutput extends BaseOutput {
  data?: CarEntity[];
}
