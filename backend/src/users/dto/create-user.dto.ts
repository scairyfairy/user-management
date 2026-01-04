import { IsString, IsEmail, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}