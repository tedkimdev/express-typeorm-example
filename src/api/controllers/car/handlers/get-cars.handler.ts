import { Response } from "express";
import { InternalServerError } from "routing-controllers";
import { CarService } from "../../../services/car.service";
import { GetCarsInput, GetCarsOutput } from "../../../dtos/car";
import { errorResponse } from "../../../../utils/error";

type getCarsFunc = (response: Response, getCarsInput: GetCarsInput) => Promise<GetCarsOutput>;

export const getCars = (carService: CarService): getCarsFunc => {
  return (async (response: Response, getCarsInput: GetCarsInput): Promise<GetCarsOutput> => {
    try {
      const cars = await carService.getCars(getCarsInput);
      return { ok: true, data: cars };
    } catch (error: unknown) {
      reportError(error);
      return errorResponse(response, new InternalServerError("failed to get cars"));
    }
  });
};
