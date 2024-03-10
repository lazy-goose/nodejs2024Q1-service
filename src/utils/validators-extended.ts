import { applyDecorators } from '@nestjs/common';
import { MinLength } from 'class-validator';
import {
  MaxLength,
  ValidateIf,
  ValidationOptions,
} from 'class-validator-stable';

export function IsNull(validationOptions?: ValidationOptions) {
  return ValidateIf((_object, value) => value !== null, validationOptions);
}

export function IsPassword(validationOptions: ValidationOptions = {}) {
  return applyDecorators(
    MinLength(4, {
      message: 'Password must be at least 8 characters',
      ...validationOptions,
    }),
    MaxLength(16, {
      message: 'Password must be less than 16 characters',
      ...validationOptions,
    }),
  );
}
