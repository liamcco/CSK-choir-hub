import { HTTPException } from 'hono/http-exception';

export class BadRequestError extends HTTPException {
  constructor(message: string | undefined) {
    super(400, { message });
  }
}

export class UnauthorizedError extends HTTPException {
  constructor(message: string) {
    super(401, { message });
  }
}

export class ForbiddenError extends HTTPException {
  constructor(message: string | undefined) {
    super(403, { message });
  }
}

export class NotFoundError extends HTTPException {
  constructor(message: string | undefined) {
    super(404, { message });
  }
}

export class ConflictError extends HTTPException {
  constructor(message: string | undefined) {
    super(409, { message });
  }
}

export class ValidationError extends HTTPException {
  constructor(message: string | undefined) {
    super(422, { message });
  }
}

export class InternalServerError extends HTTPException {
  constructor(message: string | undefined) {
    super(500, { message });
  }
}

export class ServiceUnavailableError extends HTTPException {
  constructor(message: string | undefined) {
    super(503, { message });
  }
}

export class GatewayTimeoutError extends HTTPException {
  constructor(message: string | undefined) {
    super(504, { message });
  }
}
