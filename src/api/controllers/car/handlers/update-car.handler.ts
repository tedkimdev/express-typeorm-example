import { Response } from "express";
import { BadRequestError, InternalServerError, NotFoundError } from "routing-controllers";
import { CarService } from "../../../services/car.service";
import { UpdateCarOutput, UpdateCarInput } from "../../../dtos/car";
import { errorResponse, reportError } from "../../../../utils/error";
import { VehicleService } from "../../../services/vehicle.service";

type updateCarFunc = (
  id: string,
  response: Response,
  updateCarInput: UpdateCarInput,
) => Promise<UpdateCarOutput>;

export const updateCar = (
  carService: CarService,
  vehicleService: VehicleService,
): updateCarFunc => {
  return async (
    id: string,
    response: Response,
    updateCarInput: UpdateCarInput,
  ): Promise<UpdateCarOutput> => {
    try {
      let car = await carService.getCar(id);
      if (!car) {
        return errorResponse(response, new NotFoundError(`car not found [id: ${id}]`));
      }
      if (updateCarInput.vehicleIdentificationNumber) {
        const isValidVIN = await vehicleService.validateVIN(
          updateCarInput.vehicleIdentificationNumber,
        );
        if (!isValidVIN) {
          return errorResponse(response, new BadRequestError("VIN is invalid"));
        }
      }
      car = await carService.updateCar(car, updateCarInput);
      return { ok: true, data: car };
    } catch (error: unknown) {
      reportError(error);
      return errorResponse(response, new InternalServerError("failed to update a car"));
    }
  };
};
