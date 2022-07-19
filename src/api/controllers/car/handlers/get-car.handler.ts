import { Response } from "express";
import { InternalServerError, NotFoundError } from "routing-controllers";
import { CarService } from "../../../services/car.service";
import { GetCarOutput } from "../../../dtos/car";
import { errorResponse, reportError } from "../../../../utils/error";

type getCarFunc = (response: Response, id: string) => Promise<GetCarOutput>;

export const getCar = (carService: CarService): getCarFunc => {
  return async (response: Response, id: string): Promise<GetCarOutput> => {
    try {
      const car = await carService.getCar(id);
      if (!car) {
        return errorResponse(response, new NotFoundError(`car not found [id: ${id}]`));
      }
      return { ok: true, data: car };
    } catch (error: unknown) {
      reportError(error);
      return errorResponse(response, new InternalServerError("failed to get a car"));
    }
  };
};
