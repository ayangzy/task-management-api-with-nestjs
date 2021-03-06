import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    )
    {}
    @Post('/sign-up')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise <void>{
        return this.authService.signUp(authCredentialsDto);
    }


    @Post('/sign-in')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : Promise <{accessToken:string}>{
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        //console.log(req.user.id)
    }
}
