import { BaseEntity } from 'src/config/base.entity';
import { ILink } from 'src/interfaces/links.interface';
import { User } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'links' })
export class Links extends BaseEntity implements ILink {
  @Column()
  name: string;
  @Column()
  url: string;

  @Column({ type: 'varchar', length: 7 })
  shortUrl: string;

  @Column({ default: 0 })
  clicks: number;

  @ManyToOne(() => User, (user) => user.links)
  user: User;
}
