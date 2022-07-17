import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getError } from "../../utils/error";
import { CreateCarsInput, GetCarsInput } from "../dtos/car";
import { CarEntity } from "../entities";
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

  async removeCar(id: string): Promise<boolean> {
    try {
      const result = await this.carRepository.removeCarById(id);
      return result.affected > 0;
    } catch(error: unknown) {
      throw getError(error);
    }
  }

  async getCarByVIN(vin: string) {
    try {
      return await this.carRepository.getCarByVIN(vin);
    } catch(error: unknown) {
      throw getError(error);
    }
  }

  async createCar(createCarInput: CreateCarsInput) {
    try {
      const car = new CarEntity();
      car.name = createCarInput.name;
      car.description = createCarInput.description;
      car.plate = createCarInput.plate;
      car.registration = createCarInput.registration;
      car.vehicleIdentificationNumber = createCarInput.vehicleIdentificationNumber;
      car.registrationExpirationDate = new Date(createCarInput.registrationExpirationDate);
      car.registrationState = createCarInput.registrationState;
      car.color = createCarInput.color;
      car.value = createCarInput.value;
      car.mileage = createCarInput.mileage;
      return await this.carRepository.createCar(car);
    } catch(error: unknown) {
      throw getError(error);
    }
  }
}
