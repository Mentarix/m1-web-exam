import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { BikesService } from "./bikes.service";
import { CreateBikeDto } from "./dto/create-bike.dto";
import { UpdateBikeDto } from "./dto/update-bike.dto";

@Controller("bikes")
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @Get()
  async findPaginated(
    @Query("page") pageQuery?: string,
    @Query("limit") limitQuery?: string,
  ) {
    const page = pageQuery === undefined ? 1 : Number(pageQuery);
    const limit = limitQuery === undefined ? 10 : Number(limitQuery);

    if (!Number.isSafeInteger(page) || page <= 0) {
      throw new BadRequestException("Page must be a positive integer");
    }

    if (
      !Number.isSafeInteger(limit) ||
      limit <= 0 ||
      limit > 50
    ) {
      throw new BadRequestException(
        "Limit must be a positive integer not exceeding 50",
      );
    }

    return this.bikesService.findPaginated(page, limit);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.bikesService.findById(id);
  }

  @Post()
  create(@Body() data: CreateBikeDto) {
    return this.bikesService.create(data);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() data: UpdateBikeDto,
  ) {
    return this.bikesService.update(id, data);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.bikesService.delete(id);
  }
}