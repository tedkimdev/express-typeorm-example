import { CarEntity } from "../../entities/car.entities";
import { BaseOutput } from "../common/output.dto";

export class GetCarOutput extends BaseOutput {
  data?: CarEntity;
}
