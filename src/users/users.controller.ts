import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
	
	constructor(private usersService: UsersService) {
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('/self')
	getSelf(@Req() req: { userId: number}) {
		return this.usersService.getUser(req.userId)
	}
}
