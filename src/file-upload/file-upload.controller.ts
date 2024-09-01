import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  
  @ApiOperation({ summary: 'image' })
  @Post("files")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: async (req: any, file: Express.Multer.File, cb) => {
          const uploadPath: string = `${process.env.FILE_STORAGE_PATH}`;
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req: any, file: Express.Multer.File, cb) => {
          const filename = `${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiOperation({ summary: "Upload an image/Video file using Multer" })
  upload(@UploadedFile() file: Express.Multer.File) {
    return "Files are saved Successfully with locaitons ";
  }

  
}
