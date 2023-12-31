import { Injectable, HttpException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import {InjectModel} from '@nestjs/mongoose'
import { Users, UsersDocument } from 'src/users/schema/users.schema';
import { Model } from 'mongoose';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
  constructor(@InjectModel(Users.name) private userModule:Model<UsersDocument>,
  private jwtService: JwtService
  ){}

  async login(userObjectLogin:LoginAuthDto){
    const {email, username, password} = userObjectLogin;
    const findUser = await this.userModule.findOne({$or: [{ email }, { username }]});

    if(!findUser) throw new HttpException('USER_NOT_FIND', 404);    
    if(findUser.role!=="admin") throw new HttpException('USER_UNAUTORIZED', 401);
    if(!findUser.active) throw new HttpException('USER_DESACTIVED', 410);

    const sha256Password = createHash('sha256').update(password).digest('hex');

    if(sha256Password!==findUser.password) throw new HttpException('PASSWORD_INCORRECT', 403);
    const payload = {id:findUser._id, name:findUser.firstName}
    const token = await this.jwtService.sign(payload)
    const data = {
      user: findUser,
      token
    };

    return data;
  }

}
