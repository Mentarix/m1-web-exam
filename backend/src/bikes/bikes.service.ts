import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BikesRepository } from "./bikes.repository";
import { CreateBikeDto } from "./dto/create-bike.dto";
import { UpdateBikeDto } from "./dto/update-bike.dto";

@Injectable()
export class BikesService {
  constructor(private readonly bikesRepository: BikesRepository) {}

  async findPaginated(page: number, limit: number) {
    return this.bikesRepository.findPaginated(page, limit);
  }

  async findById(id: string) {
    const bike = await this.bikesRepository.findById(id);

    if (!bike) {
      throw new NotFoundException("Bike not found");
    }

    return bike;
  }

  async create(data: CreateBikeDto) {
    return this.bikesRepository.create(data);
  }

  async update(id: string, data: UpdateBikeDto) {
    const bike = await this.bikesRepository.update(id, data);

    if (!bike) {
      throw new NotFoundException("Bike not found");
    }

    return bike;
  }

  async delete(id: string) {
    const bike = await this.bikesRepository.findById(id);

    if (!bike) {
      throw new NotFoundException("Bike not found");
    }

    if (await this.bikesRepository.hasSales(id)) {
      throw new ConflictException(
        "Cannot delete a bike that has existing sales",
      );
    }

    await this.bikesRepository.delete(id);

    return { message: "Bike deleted successfully" };
  }
}