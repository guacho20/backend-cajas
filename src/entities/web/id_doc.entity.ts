import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class IdentityDocument extends AuditMixin {
  constructor(partial?: Partial<IdentityDocument>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({length: 25})
  @ApiProperty()
  detail: string;
}
