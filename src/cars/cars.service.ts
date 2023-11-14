import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './Interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto/index';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car whith id ${id} not found`);

    return car;
  }
  create(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    console.log(newCar);
    return newCar;
  }
  update(id: string, updateCarDto: UpdateCarDto) {
    let cardb = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Car id is not valid');

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        cardb = {
          ...cardb,
          ...updateCarDto,
          id,
        };
        return cardb;
      }
      return car;
    });
    return cardb;
  }

  delete(id: string) {
    let carDb = this.findOneById(id)

    if(!carDb.id) throw new BadRequestException('Un carro con ese id no fue encontrado')

    this.cars = this.cars.filter(car => car.id !== id)
  
  }

  fillCarsWithSeedData(cars: Car[]){
    this.cars = cars
  }

  
}
