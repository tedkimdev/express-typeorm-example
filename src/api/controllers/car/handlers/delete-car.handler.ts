import { Response } from "express";
import { InternalServerError, NotFoundError } from "routing-controllers";
import { CarService } from "../../../services/car.service";
import { DeleteCarOutput } from "../../../dtos/car";
import { errorResponse, reportError } from "../../../../utils/error";

type deleteCarFunc = (response: Response, id: string) => Promise<DeleteCarOutput>;

export const deleteCar = (carService: CarService): deleteCarFunc => {
  return (async (response: Response, id: string): Promise<DeleteCarOutput> => {
    try {
      const car = await carService.getCar(id);
      if (!car) {
        return errorResponse(response, new NotFoundError(`car not found [id: ${id}]`));
      }

      const deleted = await carService.removeCar(id);
      return { ok: true, data: deleted };
    } catch (error: unknown) {
      reportError(error);
      return errorResponse(response, new InternalServerError(`Failed to remove the car [id: ${id}]`));
    }
  });
};
