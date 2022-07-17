import { Service } from "typedi";

@Service()
export class CarService {
  hello(): string {
    return "hello";
  }
}
