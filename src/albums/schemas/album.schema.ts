import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Song } from 'src/songs/schemas/song.schema';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @Prop({
    required: true,
  })
  title: string;

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

  @Prop({ type: [Types.ObjectId], ref: 'songs' })
  songs: Song[];
}
export const AlbumSchema = SchemaFactory.createForClass(Album);
