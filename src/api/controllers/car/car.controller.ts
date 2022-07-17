import { Response } from "express";
import { BadRequestError, Body, Delete, Get, InternalServerError, JsonController, NotFoundError, Param, Post, QueryParams, Res } from "routing-controllers";
import { Service } from "typedi";
import { CarService } from "../../services/car.service";
import { GetCarsInput, DeleteCarOutput, GetCarsOutput, GetCarOutput,CreateCarsInput, CreateCarOutput } from "../../dtos/car";
import { errorResponse, reportError } from "../../../utils/error";

const API_PATH = "/api/v1";

@JsonController(`${API_PATH}/cars`)
@Service()
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  async getCars(@Res() response: Response, @QueryParams() getCarsInput: GetCarsInput): Promise<GetCarsOutput> {
    try {
      const cars = await this.carService.getCars(getCarsInput);
      return { ok: true, data: cars };
    } catch (error: unknown) {
      reportError(error);
      return errorResponse(response, new InternalServerError("internal server error"));
    }
  }

  @Get("/:id")
  async getCar(@Res() response: Response, @Param("id") id: string): Promise<GetCarOutput> {
    try {
      const car = await this.carService.getCar(id);
      if (!car) {
        return errorResponse(response, new NotFoundError(`car not found [id: ${id}]`));
      }
      return { ok: true, data: car };
    } catch (error: unknown) {
      reportError(error);
      return errorResponse(response, new InternalServerError("internal server error"));
    }
  }
  @Post()
  async createCar(@Res() response: Response, @Body() createCarsInput: CreateCarsInput): Promise<CreateCarOutput> {
    try {
      let car = await this.carService.getCarByVIN(createCarsInput.vehicleIdentificationNumber);
      if (car) {
        return errorResponse(response, new BadRequestError("there is a car with that VIN"));
      }
      car = await this.carService.createCar(createCarsInput);
      return { ok: true, data: car };
    } catch (error: unknown) {
      reportError(error);
      return errorResponse(response, new InternalServerError("internal server error"));
    }
  }

  @Delete("/:id")
  async removeCar(@Res() response: Response, @Param("id") id: string): Promise<DeleteCarOutput> {
    try {
      const car = await this.carService.getCar(id);
      if (!car) {
        return errorResponse(response, new NotFoundError(`car not found [id: ${id}]`));
      }

      const deleted = await this.carService.removeCar(id);
      return { ok: true, data: deleted };
    } catch (error: unknown) {
      reportError(error);
      return errorResponse(response, new InternalServerError(`Failed to remove the car [id: ${id}]`));
    }
  }
}
