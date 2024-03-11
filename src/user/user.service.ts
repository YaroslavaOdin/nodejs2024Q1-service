import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { Database } from 'src/database/database';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4, validate } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private database: Database) {}

  findAllUsers(): User[] {
    return this.database.users;
  }

  findOneUser(id: string): User {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    const user = this.database.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  createUser(userDto: CreateUserDto) {
    if (!userDto?.login || !userDto?.password) {
      throw new HttpException('Invalid user data.', HttpStatus.BAD_REQUEST);
    }
    const newUser: User = {
      id: uuidv4(),
      login: userDto.login,
      password: userDto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    this.database.users.push(newUser);
    const cloneUser = JSON.parse(JSON.stringify(newUser));
    delete cloneUser.password;

    return cloneUser;
  }

  updateUser(id: string, userDto: UpdatePasswordDto): User {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }

    if (!userDto?.newPassword || !userDto?.oldPassword) {
      throw new HttpException('Invalid user data.', HttpStatus.BAD_REQUEST);
    }

    const user = this.database.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    if (user.password !== userDto.oldPassword) {
      throw new HttpException(
        'Old password is incorrect.',
        HttpStatus.FORBIDDEN,
      );
    }

    user.password = userDto.newPassword;
    user.version += 1;
    user.updatedAt = new Date().getTime();

    const cloneUser = JSON.parse(JSON.stringify(user));
    delete cloneUser.password;

    return cloneUser;
  }

  removeUser(id: string): void {
    if (!validate(id)) {
      throw new HttpException('Invalid ID.', HttpStatus.BAD_REQUEST);
    }
    const removedUser = this.findOneUser(id);
    this.database.users = this.database.users.filter(
      (user) => user.id !== removedUser.id,
    );
  }
}
