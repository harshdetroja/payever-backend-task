import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import axios from 'axios';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private rabbitMQService: RabbitMQService,
    private readonly emailService: EmailService,
  ) {}

  async createUser(userData: any): Promise<User> {
    const createdUser = new this.userModel(userData);
    await this.emailService.sendEmail(userData.email, 'Subject', 'Hello World');
    await this.rabbitMQService.sendEvent('pattern', { data: 'hello world' });
    return createdUser.save();
  }

  async getUserById(userId: any): Promise<any> {
    const response = await axios.get(`https://reqres.in/api/users/${userId}`);
    return response.data.data;
  }

  async getUserAvatar(userId: any): Promise<any> {
    const user = await this.userModel.findOne({ userId });
    if (user) {
      if (user.hash) {
        return user.hash;
      } else {
        const avatarHash = this.generateHash(user.avatar);
        const avatarBase64 = await this.saveAvatar(
          userId,
          user.avatar,
          avatarHash,
        );

        return avatarBase64;
      }
    }
    const userData = await this.getUserById(userId);
    const avatarUrl = userData.avatar;
    const avatarHash = this.generateHash(avatarUrl);
    const avatarBase64 = await this.saveAvatar(userId, avatarUrl, avatarHash);
    return avatarBase64;
  }

  private async saveAvatar(
    userId: any,
    avatarUrl: string,
    avatarHash: string,
  ): Promise<string> {
    await this.userModel.updateOne(
      { userId },
      { hash: avatarHash, avatar: avatarUrl },
      { upsert: true },
    );
    return avatarHash;
  }

  async deleteUserAvatar(userId: any): Promise<any> {
    await this.userModel.deleteOne({ userId });
    return { msg: 'deleted' };
  }

  private generateHash(data: string): string {
    // Create a SHA-256 hash of the input data
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex'); // Return the hash as a hexadecimal string
  }
}
