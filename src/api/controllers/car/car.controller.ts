import { Get, JsonController } from "routing-controllers";
import { Service } from "typedi";
import { CarService } from "../../services/car.service";

@JsonController("/cars")
@Service()
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  hello(): string {
    return this.carService.hello();
  }
}
