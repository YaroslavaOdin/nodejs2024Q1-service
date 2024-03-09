import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.userService.findOneUser(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto): User {
    return this.userService.createUser(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePasswordDto): User {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.userService.removeUser(id);
  }
}
