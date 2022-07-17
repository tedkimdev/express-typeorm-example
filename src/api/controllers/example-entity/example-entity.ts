import { Body, Get, JsonController, Post } from "routing-controllers";

import { ExampleEntity } from "../../entities";

@JsonController("/example-entity")
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
