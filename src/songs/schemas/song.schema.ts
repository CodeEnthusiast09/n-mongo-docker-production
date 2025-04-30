import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Album } from 'src/albums/schemas/album.schema';

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    type: Types.ObjectId,
    ref: Album.name,
  })
  album: Album;

  @Prop({
    type: [String],
    required: true,
  })
  artist: string[];

  @Prop({
    required: true,
  })
  releasedDate: Date;

  @Prop({
    required: true,
  })
  duration: number;

  @Prop()
  lyrics: string;
}
export const SongSchema = SchemaFactory.createForClass(Song);
