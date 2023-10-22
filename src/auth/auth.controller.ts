import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { ValidateUserDto } from 'src/users/dto/validate-user.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	login(@Body() userDto: ValidateUserDto) {
		return this.authService.login(userDto)
	}
	@Post('/registration')
	registration(@Body() userDto: CreateUserDto) {
		return this.authService.registration(userDto)
	}
}
