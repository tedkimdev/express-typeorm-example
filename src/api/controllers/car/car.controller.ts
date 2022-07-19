import { Response } from "express";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
  Res,
} from "routing-controllers";
import { Service } from "typedi";
import { CarService } from "../../services/car.service";
import {
  GetCarsInput,
  DeleteCarOutput,
  GetCarsOutput,
  GetCarOutput,
  CreateCarInput,
  CreateCarOutput,
  UpdateCarInput,
  UpdateCarOutput,
} from "../../dtos/car";
import { VehicleService } from "../../services/vehicle.service";
import * as handler from "./handlers";

const API_PATH = "/api/v1";

@JsonController(`${API_PATH}/cars`)
@Service()
export class CarController {
  constructor(private carService: CarService, private vehicleService: VehicleService) {}

  @Get()
  getCars(
    @Res() response: Response,
    @QueryParams() getCarsInput: GetCarsInput,
  ): Promise<GetCarsOutput> {
    return handler.getCars(this.carService)(response, getCarsInput);
  }

  @Get("/:id")
  getCar(@Res() response: Response, @Param("id") id: string): Promise<GetCarOutput> {
    return handler.getCar(this.carService)(response, id);
  }
  @Post()
  createCar(
    @Res() response: Response,
    @Body() createCarInput: CreateCarInput,
  ): Promise<CreateCarOutput> {
    return handler.createCar(this.carService, this.vehicleService)(response, createCarInput);
  }

  @Put("/:id")
  updateCar(
    @Param("id") id: string,
    @Res() response: Response,
    @Body() updateCarInput: UpdateCarInput,
  ): Promise<UpdateCarOutput> {
    return handler.updateCar(this.carService, this.vehicleService)(id, response, updateCarInput);
  }

  @Delete("/:id")
  removeCar(@Res() response: Response, @Param("id") id: string): Promise<DeleteCarOutput> {
    return handler.deleteCar(this.carService)(response, id);
  }
}
