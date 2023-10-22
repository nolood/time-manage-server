import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { ValidateUserDto } from 'src/users/dto/validate-user.dto'
import { UsersService } from 'src/users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	private readonly secretKey = process.env.PRIVATE_KEY || 'EGORLOX'

	async login(dto: ValidateUserDto) {
		const user = await this.validateUser(dto)
		const { token } = await this.generateToken(user)
		return { user, token }
	}

	async registration(dto: CreateUserDto) {
		const candidateNick = await this.usersService.getUserByLogin(dto.username)
		if (candidateNick) {
			throw new HttpException('nickname-already-exists', HttpStatus.BAD_REQUEST)
		}
		const candidateEmail = await this.usersService.getUserByLogin(dto.email)
		if (candidateEmail) {
			throw new HttpException('email-already-exists', HttpStatus.BAD_REQUEST)
		}
		console.log(dto)
		const hashPassword = await bcrypt.hash(dto.password, 5)
		const user = await this.usersService.createUser({
			...dto,
			password: hashPassword,
		})
		const { token } = await this.generateToken(user)
		return { user, token }
	}

	private async generateToken(user) {
		const payload = {
			username: user.username,
			id: user.id,
		}

		return { token: this.jwtService.sign(payload) }
	}

	private async validateUser(dto: ValidateUserDto) {
		const user = await this.usersService.getUserByLogin(dto.login)
		if (!user) {
			throw new HttpException('user-notfound', HttpStatus.BAD_REQUEST)
		}
		const passwordEqual = await bcrypt.compare(dto.password, user.password)
		if (user && passwordEqual) {
			return user
		}
		throw new UnauthorizedException({ message: 'wrong-password' })
	}

	decodeToken(token: string): number {
		const decoded: { id: number } = this.jwtService.decode(token) as {
			id: number
		}
		return decoded.id
	}
}
