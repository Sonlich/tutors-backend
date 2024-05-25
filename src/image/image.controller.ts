import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImageService } from './image.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('/:filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), `static/${filename}`));
    return new StreamableFile(file);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an image',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.imageService.uploadImage(file);
  }
}
