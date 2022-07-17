import { Service } from "typedi";
import { Repository, EntityRepository } from "typeorm";
import { GetCarsInput } from "../dtos/car/get-cars.dto";
import { CarEntity } from "../entities/car.entities";

@Service()
@EntityRepository(CarEntity)
export class CarRepository extends Repository<CarEntity> {
  getCars(getCarsInput: GetCarsInput): Promise<CarEntity[]> {
    const where = {
      ...getCarsInput,
    };
    return this.find({
      where,
    });
  }

  getCarById(id: string): Promise<CarEntity> {
    return this.findOne(id);
  }

  getCarByVIN(vin: string): Promise<CarEntity> {
    return this.findOne({ where: { vehicleIdentificationNumber: vin } });
  }

  removeCarById(id: string) {
    return this.delete(id);
  }

  createCar(car: CarEntity) {
    return this.save(car);
  }
}