import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import AuditMixin from 'src/entities/audit.mixin.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PasswordRules extends AuditMixin {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({length: 25})
  @ApiProperty()
  name: string;

  @Column('int', {nullable: true})
  @ApiProperty()
  min_lenght: number;

  @Column('int', {nullable: true})
  @ApiProperty()
  special_chars_num: number;

  @Column('int', {nullable: true})
  @ApiProperty()
  capital_letters_num: number;

  @Column('int', {nullable: true})
  @ApiProperty()
  lower_letters_num: number;

  @Column('int', {nullable: true})
  @ApiProperty()
  numbers_num: number;

  @Column('int', {nullable: true})
  @ApiProperty()
  attemps: number;

  @Column('int', {nullable: true})
  @ApiProperty()
  previous_valid_num: number;

  constructor(partial?: Partial<PasswordRules>) {
    super();

    if(partial) {
      Object.assign(this, partial);
    }
  }


  comparePasswordRules(plainPassword: string): boolean {
    const regexpMinNumber = /(?:[\w$-/:-?{-~!"^_`\[\]#])/g;
    const regexpSpecialCharNumber = /(?:[$-/:-?{-~!"^_`\[\]#])/g;
    const regexpCapitalNumber = /(?:[A-ZÑ])/g;
    const regexpLowerNumber = /(?:[a-zñ])/g;
    const regexpNumbersNumber = /(?:[\d])/g;

    const minNumber = plainPassword.match(regexpMinNumber);
    const specialNumber = plainPassword.match(regexpSpecialCharNumber);
    const capitalNumber = plainPassword.match(regexpCapitalNumber);
    const lowerNumber = plainPassword.match(regexpLowerNumber);
    const numbersNumber = plainPassword.match(regexpNumbersNumber);

    const lenghtMin = (minNumber || []).length;
    console.log('Longitud mínima: ', lenghtMin);

    const lenghtSpecial = (specialNumber || []).length;
    console.log('Longitud mínima: ', lenghtSpecial);

    const lenghtCapital = (capitalNumber || []).length;
    console.log('Longitud mínima: ', lenghtCapital);

    const lenghtLower = (lowerNumber || []).length;
    console.log('Longitud mínima: ', lenghtLower);

    const lenghtNumbers = (numbersNumber || []).length;
    console.log('Longitud mínima: ', lenghtNumbers);

    if (
      lenghtMin >= this.min_lenght &&
      lenghtSpecial >= this.special_chars_num &&
      lenghtCapital >= this.capital_letters_num &&
      lenghtLower >= this.lower_letters_num &&
      lenghtNumbers >= this.numbers_num
    ) {
      return true;
    }
    return false;
  }
}
