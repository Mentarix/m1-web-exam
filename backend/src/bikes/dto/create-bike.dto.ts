import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";

export class CreateBikeDto {
  @Transform(({ value }) =>
    typeof value === "string" ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  brand: string;

  @Transform(({ value }) =>
    typeof value === "string" ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  frameMaterial: string;

  @IsNumber()
  @Min(0.01)
  frameSizeCm: number;

  @IsNumber()
  @Min(0.01)
  wheelSizeInches: number;

  @IsNumber()
  @Min(1)
  gearCount: number;

  @IsNumber()
  @Min(0.01)
  weightKg: number;

  @IsBoolean()
  electric: boolean;

  @IsNumber()
  @Min(0)
  priceCents: number;
}