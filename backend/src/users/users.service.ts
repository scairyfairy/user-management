import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        return user;
    }

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        this.usersRepository.merge(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}