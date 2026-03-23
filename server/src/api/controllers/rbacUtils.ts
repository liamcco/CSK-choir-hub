import { BadRequestError } from '@/utils/errors';

export function getTrimmedString(value: unknown) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

export function requireTrimmedString(value: unknown, message: string) {
  const trimmedValue = getTrimmedString(value);

  if (!trimmedValue) {
    throw new BadRequestError(message);
  }

  return trimmedValue;
}

export function parseOptionalDateTime(value: unknown, fieldName: string) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (typeof value !== 'string') {
    throw new BadRequestError(`${fieldName} must be a valid ISO date-time string`);
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new BadRequestError(`${fieldName} must be a valid ISO date-time string`);
  }

  return parsedDate;
}

export function parseEnumValue<T extends string>(
  value: unknown,
  allowedValues: readonly T[],
  fieldName: string,
) {
  if (typeof value !== 'string' || !allowedValues.includes(value as T)) {
    throw new BadRequestError(`${fieldName} must be one of: ${allowedValues.join(', ')}`);
  }

  return value as T;
}
