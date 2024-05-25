import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  async uploadImage(file: Express.Multer.File) {
    try {
      const directoryPath = path.join('static');
      console.log('he;o');

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      const name = `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;
      const newFilePath = path.join(directoryPath, name);

      const buffer = Buffer.from(file.buffer);

      await fs.promises.writeFile(newFilePath, buffer);

      return name;
    } catch (error) {
      throw new Error('Error while saving the file');
    }
  }
}
