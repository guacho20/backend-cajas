import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/models/user_response.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserResponse;
    if (!user) return false;
    return this.matchRoles(roles, user.profile_id);
  }


  matchRoles(roles: string[], profile_id: any): boolean | Promise<boolean> | Observable<boolean> {
    const admin = roles.some(i => i === 'admin');
    if (admin) {
      return profile_id === 1;
    }
    const cashier = roles.some(i => i === 'cashier');
    if (cashier) {
      return profile_id === 2 || profile_id === 1;
    }
    const consultant = roles.some(i => i === 'consultant');
    if (consultant) {
      return profile_id === 3 || profile_id === 2 || profile_id === 1;
    }
    throw new ForbiddenException('¡No tiene permisos para realizar esta acción!');
  }
}
