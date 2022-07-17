import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { GetCarsInput } from "../controllers/car/get-cars.dto";
// import { CarEntity } from "../entities";
import { CarRepository } from "../repositories/car.repository";

@Service()
export class CarService {
  constructor(@InjectRepository() private carRepository: CarRepository) {}

  async getCars(getCarsInput: GetCarsInput) {
    try {
      return await this.carRepository.getCars(getCarsInput);
    } catch(error: unknown) {
      if (error instanceof Error) throw error;
      throw new Error(`unknown error: ${String(JSON.stringify(error))}`);
    }
  }

  async getCar(id: string) {
    try {
      return this.carRepository.getCarById(id);
    } catch(error: unknown) {
      if (error instanceof Error) throw error;
      throw new Error(`unknown error: ${String(JSON.stringify(error))}`);
    }
  }
}
