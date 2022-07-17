import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CarEntity } from "../entities";
import { CarRepository } from "../repositories/car.repository";

@Service()
export class CarService {
  constructor(@InjectRepository() private carRepository: CarRepository) {}

  async getCar(id: string) {
    try {
      return this.carRepository.getCarById(id);
    } catch(error: unknown) {
      if (error instanceof Error) throw error;
      throw new Error(`unknown error: ${String(error)}`);
    }
  }
}
