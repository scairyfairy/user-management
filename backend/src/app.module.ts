import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    // Configure Database Connection
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'user_db',
      entities: [User],
      synchronize: true, // Auto-create tables (DEV ONLY)
    }),
    UsersModule,
  ],
})
export class AppModule { }