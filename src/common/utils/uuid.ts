import { Param, ParseUUIDPipe } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';

export function generateUUID() {
  return uuidv4();
}

export function isUUID(string: string) {
  return validate(string);
}

export function UUIDParam(name: string) {
  return Param(name, new ParseUUIDPipe({ version: '4' }));
}
