import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    SKU: string;
  
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    pictures: string[];
  
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: Number;
  
    @IsNotEmpty()
    currency: string;
    
    code: Number;
  
    description: string;
}
