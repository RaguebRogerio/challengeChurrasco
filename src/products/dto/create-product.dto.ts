import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    SKU: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    pictures: string[];
  
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: Number;
  
    @IsString()
    @IsNotEmpty()
    currency: string;
    
    @IsNumber()
    @IsOptional()
    code: Number;
    
    @IsString()
    @IsOptional()
    description: string;
}
