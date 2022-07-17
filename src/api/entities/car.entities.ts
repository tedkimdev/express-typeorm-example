import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("Cars")
export class CarEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @Column({ length: 17 })
  vehicleIdentificationNumber: string;

  @Column()
  description: string;

  @Column({ type: "double" })
  value: number;

  @Column()
  mileage: number;

  @Column()
  color: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
