import { BaseEntity } from 'src/config/base.entity';
import { ROLES } from 'src/constants/roles';
import { IUser } from 'src/interfaces/user.interface';
import { Links } from 'src/links/entities/links.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @Column()
  name: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;

  @Column({ type: 'enum', enum: ROLES })
  role: ROLES;

  @OneToMany(() => Links, (link) => link.user)
  links: Links[];
}
