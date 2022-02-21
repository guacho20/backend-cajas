import { User } from "src/entities/user/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UserResponse {
  constructor(id: string, profile: number, profile_name: string, profile_detail: string,  name: string, email: string, expiration_date?: Date, theme?: string, photo?: string) {
    this.id = id;
    this.profile_id = profile;
    this.profile_name = profile_name;
    this.profile_detail = profile_detail;
    this.name = name;
    this.email = email;
    this.expiration_date = expiration_date;
    this.theme = theme;
  }

  static fromUserEntity(user: User): UserResponse {
    const { id, profile, name, email, expiration_date, theme } = user;
    return new UserResponse(id, profile.id, profile.profile, profile.detail, name, email, expiration_date, theme);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  profile_id: number;

  @ApiProperty()
  profile_name: string;
  
  @ApiProperty()
  profile_detail: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  expiration_date?: Date;

  @ApiProperty()
  theme?: string;
}