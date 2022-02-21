import { Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export default abstract class AuditMixin {
    @Column({default: true})
    @ApiProperty()
    is_active: boolean;

    @Column({nullable: true})
    @ApiProperty()
    register_user: string;

    @Column('timestamp with time zone', {nullable: true})
    @ApiProperty()
    register_datetime: Date;

    @Column({nullable: true})
    @ApiProperty()
    update_user: string;

    @Column('timestamp with time zone', {nullable: true})
    @ApiProperty()
    update_datetime: Date;

    @BeforeInsert()
    registerDate() {
      this.register_datetime = new Date;
    }

    @BeforeUpdate()
    updateDate() {
      this.update_datetime = new Date;
    }
}
