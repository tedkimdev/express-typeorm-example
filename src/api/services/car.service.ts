import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getError } from "../../utils/error";
import { GetCarsInput } from "../dtos/car/get-cars.dto";
import { CarRepository } from "../repositories/car.repository";

@Service()
export class CarService {
  constructor(@InjectRepository() private carRepository: CarRepository) {}

  async getCars(getCarsInput: GetCarsInput) {
    try {
      return await this.carRepository.getCars(getCarsInput);
    } catch(error: unknown) {
      throw getError(error);
    }
  }

  async getCar(id: string) {
    try {
      return this.carRepository.getCarById(id);
    } catch(error: unknown) {
      throw getError(error);
    }
  }
}
