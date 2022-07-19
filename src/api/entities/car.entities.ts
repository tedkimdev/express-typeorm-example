/* eslint-disable indent */
import { Column, Entity } from "typeorm";
import { CommonEntity } from "./common.entities";

@Entity("Cars")
export class CarEntity extends CommonEntity {
  @Column({ length: 7 })
  plate: string;

  @Column({ length: 7 })
  registration: string;

  @Column()
  registrationState: string;

  @Column()
  registrationExpirationDate: Date;

  @Column()
  name: string;

  @Column({ length: 17, unique: true })
  vehicleIdentificationNumber: string;

  @Column()
  description: string;

  @Column({ type: "double" })
  value: number;

  @Column()
  mileage: number;

  @Column()
  color: string;
}
