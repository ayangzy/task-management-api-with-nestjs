import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { statusCodes } from 'src/config/status-codes';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';


@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecrete51',
      signOptions:{
        expiresIn: 3660,
      }
    }),
   
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy],
  exports: [jwtStrategy, PassportModule],
})
export class AuthModule {}
