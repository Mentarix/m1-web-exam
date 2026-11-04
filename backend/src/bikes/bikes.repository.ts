import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BikeEntity } from "./entities/bike.entity";
import { BikeSellEntity } from "../customers/entities/bike-sell.entity";

@Injectable()
export class BikesRepository {
  constructor(
    @InjectRepository(BikeEntity)
    private readonly bikeRepository: Repository<BikeEntity>,

    @InjectRepository(BikeSellEntity)
    private readonly bikeSellRepository: Repository<BikeSellEntity>,
  ) {}

  async findPaginated(page: number, limit: number) {
    const [bikes, totalCount] = await this.bikeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { brand: "ASC", model: "ASC", id: "ASC" },
    });

    return { totalCount, bikes };
  }

  async findById(id: string) {
    return this.bikeRepository.findOne({ where: { id } });
  }

  async create(data: Partial<BikeEntity>) {
    const bike = this.bikeRepository.create(data);
    return this.bikeRepository.save(bike);
  }

  async update(id: string, data: Partial<BikeEntity>) {
    const bike = await this.findById(id);

    if (!bike) return null;

    Object.assign(bike, data);
    return this.bikeRepository.save(bike);
  }

  async hasSales(id: string) {
    return this.bikeSellRepository.exists({
      where: { bikeId: id },
    });
  }

  async delete(id: string) {
    return this.bikeRepository.delete(id);
  }
}