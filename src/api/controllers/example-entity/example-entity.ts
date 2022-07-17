import { Body, Get, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";

import { ExampleEntity } from "../../entities";

@JsonController("/example-entity")
@Service()
export class UserController {
  @Get()
  get(): Promise<ExampleEntity[]> {
    return ExampleEntity.find();
  }

  @Post()
  create(@Body() body: Pick<ExampleEntity, "exampleColumn">): Promise<ExampleEntity> {
    return ExampleEntity.create(body).save();
  }
}
