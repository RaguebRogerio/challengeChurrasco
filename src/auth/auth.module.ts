import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/schema/users.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
      name:Users.name,
      schema: UsersSchema
    }
  ]),
  JwtModule.register({
    secret: `${process.env.JWT_CONSTANTS}`,
    signOptions: { expiresIn: '1200s' },
  })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
