import { IsIP, IsNotEmpty } from 'class-validator';

export class QueryIp {
  @IsIP()
  @IsNotEmpty()
  ip: string;
}
