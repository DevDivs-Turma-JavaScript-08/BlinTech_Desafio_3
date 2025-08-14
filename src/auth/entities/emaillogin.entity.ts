import { ApiProperty } from "@nestjs/swagger";

export class EmailLogin {
  @ApiProperty()
  public email: string;

  @ApiProperty()
  public senha: string;
}