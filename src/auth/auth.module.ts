import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstanst } from './jwt.constants';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
      name:Users.name,
      schema: UsersSchema
    }
  ]),
  JwtModule.register({
    secret: jwtConstanst.secret,
    signOptions: { expiresIn: '1200s' },
  })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
