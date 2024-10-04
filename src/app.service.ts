import { Injectable, NotFoundException } from '@nestjs/common';
import * as geoip from 'geoip-lite';
import { IpResponse } from './interfaces/app.interface';

@Injectable()
export class AppService {
  getIp(ip: string) {

    const geo = geoip.lookup(ip);
    if (!geo) throw new NotFoundException({ message: 'Ip not found' });

    const response: IpResponse = {
      lat: geo.ll[0],
      lng: geo.ll[1],
      country: geo.country,
      city: geo.city,
    };

    return response;
  }
}
