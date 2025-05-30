import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'starkhospital-secret', // Same secret as in JwtModule
    });
  }

  async validate(payload: any) {
    // This runs on each request after token is verified
    return { userId: payload.sub, phone: payload.phone };
  }
}
