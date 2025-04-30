import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song, SongDocument } from './schemas/song.schema';
import { Model } from 'mongoose';
import { CreateSongDTO } from './dto/create-song.dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name)
    private readonly songModel: Model<SongDocument>,
  ) {}

  async create(
    createSongDTO: CreateSongDTO,
  ): Promise<{ success: boolean; message: string; song?: Song }> {
    try {
      const savedSong = await this.songModel.create(createSongDTO);
      return {
        success: true,
        message: 'Song added succesfully',
        song: savedSong,
      };
    } catch (error) {
      return {
        success: false,
        message: `Unable to add song: ${error}`,
      };
    }
  }

  async find(): Promise<{ success: boolean; message: string; data?: Song[] }> {
    try {
      const songs = await this.songModel.find();

      return {
        success: true,
        message: 'Data retrieved successfully',
        data: songs,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        `Unable to fetch songs: ${errorMessage}`,
      );
    }
  }

  async findById(id: string): Promise<Song> {
    const song = await this.songModel.findById(id);
    if (!song) {
      throw new InternalServerErrorException('Song not found');
    }
    return song;
  }

  async delete(id: string) {
    return this.songModel.deleteOne({ _id: id });
  }
}
