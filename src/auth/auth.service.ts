import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { jwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto) {
        return await this.userRepository.signUp(authCredentialsDto);
    }


    async signIn(authCredentialsDto: AuthCredentialsDto) : Promise <{accessToken:string}>{
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException('Invalid login credenetials')
        }
        
        const payload: jwtPayload = { username };

        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };

    }
}
