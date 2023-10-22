import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userRepository: typeof User) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto)
		return user
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll()
		return users
	}

	async getUserByLogin(login: string) {
		const user = await this.userRepository.findOne({ where: { email: login } })
		if (!user) {
			return this.userRepository.findOne({ where: { username: login } })
		}
		return user
	}

	async getUser(id: number) {
		const user = await this.userRepository.findOne({ where: { id } })
		return user
	}
}
