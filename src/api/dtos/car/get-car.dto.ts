import { CarEntity } from "src/api/entities";
import { BaseOutput } from "../common/output.dto";

export class GetCarOutput extends BaseOutput {
  data?: CarEntity;
}