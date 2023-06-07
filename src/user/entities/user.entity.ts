import { Image } from 'src/image/entities/image.entity';
import { Tags } from 'src/tags/entities/tags.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  skill: string;

  @Column()
  date: string;

  @Column()
  imgs: string;

  // @OneToOne(() => Image, img => img.photo)
  // @JoinColumn()
  // image: Image

  @OneToMany(() => Tags, (tags) => tags.user)
  tags: Tags[]
}
