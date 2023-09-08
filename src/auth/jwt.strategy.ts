import { Injectable } from "@nestjs/common";
import { Strategy,ExtractJwt } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstanst } from "./jwt.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey:jwtConstanst.secret,
        });
      }
    
     async validate(payload: any) {
    return { userId: payload.id, username: payload.name };
    }
}