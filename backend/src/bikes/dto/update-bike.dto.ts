import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class UpdateBikeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  brand?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  model?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  frameMaterial?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  frameSizeCm?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  wheelSizeInches?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  gearCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  weightKg?: number;

  @IsOptional()
  @IsBoolean()
  electric?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  priceCents?: number;
}