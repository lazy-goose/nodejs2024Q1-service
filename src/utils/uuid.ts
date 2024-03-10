import { Param, ParseUUIDPipe } from '@nestjs/common';
import { UUID_VERSION } from 'src/constants';
import { v4 as uuidv4, validate } from 'uuid';

export function generateUUID() {
  return uuidv4();
}

export function isUUID(string: string) {
  return validate(string);
}

export function UUIDParam(name: string) {
  return Param(name, new ParseUUIDPipe({ version: `${UUID_VERSION}` }));
}
