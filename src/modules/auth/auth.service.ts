import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserResponse } from 'src/models/user_response.model';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private audit: AuditService
  ) {}

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.userService.findOne(email);
    if (user && await user.password.comparePassword(password) && user.locked !== true) {
      const result = UserResponse.fromUserEntity(user);
      return result;
    }
    await this.audit.createAccessAudit('FALLO INGRESO', `Login ${email}`);
    return null;
  }

  async login(user: UserResponse) {
    await this.audit.createAccessAudit('INGRESO AL SISTEMA', 'Login');
    let payload: any;
    if ((user as any).exp || (user as any).iat) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { exp, iat, ...userP } = user as any;
      payload = { ...userP };
    } else {
      payload = { ...user }
    }
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: "2d" }),
    };
  }
}
