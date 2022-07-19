import { Response } from "express";
import { BadRequestError, InternalServerError } from "routing-controllers";
import { CarService } from "../../../services/car.service";
import { CreateCarOutput, CreateCarInput } from "../../../dtos/car";
import { errorResponse, reportError } from "../../../../utils/error";
import { VehicleService } from "../../../services/vehicle.service";

type createCarFunc = (
  response: Response,
  createCarInput: CreateCarInput,
) => Promise<CreateCarOutput>;

export const createCar = (
  carService: CarService,
  vehicleService: VehicleService,
): createCarFunc => {
  return async (response: Response, createCarInput: CreateCarInput): Promise<CreateCarOutput> => {
    try {
      const isValidVIN = await vehicleService.validateVIN(
        createCarInput.vehicleIdentificationNumber,
      );
      if (!isValidVIN) {
        return errorResponse(response, new BadRequestError("VIN is invalid"));
      }
      let car = await carService.getCarByVIN(createCarInput.vehicleIdentificationNumber);
      if (car) {
        return errorResponse(response, new BadRequestError("there is a car with that VIN"));
      }
      car = await carService.createCar(createCarInput);
      return { ok: true, data: car };
    } catch (error: unknown) {
      reportError(error);
      return errorResponse(response, new InternalServerError("failed to create a car"));
    }
  };
};
