import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch()
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    let httpStatus: number;

    if (exception instanceof Prisma.PrismaClientValidationError) {
      httpStatus = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const code = exception.code;
      if (code === 'P2025') {
        httpStatus = HttpStatus.NOT_FOUND;
      } else {
        httpStatus = HttpStatus.BAD_REQUEST;
      }
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof Prisma.PrismaClientInitializationError) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      super.catch(exception, host);
      return;
    }

    const errorResponse = {
      error: exception.message,
    };

    this.applicationRef.reply(ctx.getResponse(), errorResponse, httpStatus);
  }
}
