import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { CommercialCashbox } from './commercial_cashbox.entity';
import { Commercial } from './commercial.entity';
import { IdentityDocument } from './id_doc.entity';
import { State } from './state.entity';
import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cashier extends AuditMixin {
  constructor(partial?: Partial<Cashier>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(() => CommercialCashbox)
  @ApiProperty({ type: () => CommercialCashbox })
  commercial_cashbox: CommercialCashbox;

  @ManyToOne(() => Commercial)
  @ApiProperty({ type: () => Commercial })
  commercial: Commercial;

  @ManyToOne(() => IdentityDocument)
  @ApiProperty({ type: () => IdentityDocument })
  identity_doc: IdentityDocument;

  @ManyToOne(() => State)
  @ApiProperty({ type: () => State })
  state: State;

  @ManyToOne(() => User)
  @ApiProperty({ type: () => User })
  user: User;

  @Column({length: 50})
  @ApiProperty()
  names: string;

  @Column({length: 25})
  @ApiProperty()
  document: string;

  @Column('date')
  @ApiProperty()
  birth_date: Date;

  @Column({length: 25})
  @ApiProperty()
  genre: string;

  @Column({length: 25})
  @ApiProperty()
  email: string;

  @Column({length: 10})
  @ApiProperty()
  cellphone: string;

  @Column({length: 25})
  @ApiProperty()
  phone: string;

  @Column({length: 100})
  @ApiProperty()
  address: string;
}
