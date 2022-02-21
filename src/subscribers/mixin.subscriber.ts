import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, EntitySubscriberInterface, InsertEvent, EventSubscriber, UpdateEvent, RemoveEvent } from 'typeorm';
import { Request } from 'express';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { UserResponse } from 'src/models/user_response.model';
import { AuditService } from 'src/modules/audit/audit.service';

@Injectable({ scope: Scope.REQUEST })
@EventSubscriber()
export class MixinSubscriber implements EntitySubscriberInterface<AuditMixin> {

  constructor(
    @InjectConnection() readonly connection: Connection,
    @Inject(REQUEST) readonly req: Request,
    private audit: AuditService,
  ) {
    connection.subscribers.push(this);
  }

  beforeInsert(event: InsertEvent<AuditMixin>) {
    // called before insert
    const user = this.req.user as UserResponse;
    if (event.entity.register_user !== undefined && user.id) {
      event.entity.register_user = user.id;
    }
  };

  beforeUpdate(event: UpdateEvent<AuditMixin>) {
    // called before insert
    const user = this.req.user as UserResponse;
    if (event.entity.register_user !== undefined && user.id) {
      event.entity.update_user = user.id;
    }
  };

  afterRemove(event: RemoveEvent<any>) {
    this.audit.createAccessAudit('INGRESO PANTALLA', `Borrando ${event.entity}`)
  }

}