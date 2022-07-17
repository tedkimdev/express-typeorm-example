import { Service } from "typedi";
import { Repository, EntityRepository } from "typeorm";
import { CarEntity } from "../entities/car.entities";

@Service()
@EntityRepository(CarEntity)
export class CarRepository extends Repository<CarEntity> {
  getCarById(id: string): Promise<CarEntity> {
    return this.findOne(id);
  }
}
