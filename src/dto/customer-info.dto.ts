import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CustomerInfoDTO {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly address: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
}
