import { Response } from "express";
import { Get, InternalServerError, JsonController, NotFoundError, Param, Res } from "routing-controllers";
import { Service } from "typedi";
import { CarService } from "../../services/car.service";

const API_PATH = "/api/v1";
@JsonController(`${API_PATH}/cars`)
@Service()
export class CarController {
  constructor(private carService: CarService) {}

  @Get("/:id")
  async getCar(@Res() response: Response, @Param("id") id: string) {
    try {
      const car = await this.carService.getCar(id);
      if (!car) {
        const notFoundError = new NotFoundError(`car not found [id: ${id}]`);
        response.status(notFoundError.httpCode);
        return notFoundError;
      }
      return car;
    } catch (error: unknown) {
      if (error instanceof Error) {
        // send the error to a logging service
      }
      const internalServerError = new InternalServerError("internal server error");
      response.status(internalServerError.httpCode);
      return internalServerError;
    }
  }
}
