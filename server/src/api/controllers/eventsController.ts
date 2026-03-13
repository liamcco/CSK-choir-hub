import { type NextFunction, type Request, type Response } from 'express';

import { eventService } from '@/services';
import { BadRequestError, NotFoundError } from '@/utils/errors';

// Get all events
export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await eventService.getAllEvents();

    return res.json({ events });
  } catch (error) {
    return next(error);
  }
};

// Get event details by ID
export const getEventDetail = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId;

  if (!eventId) throw new BadRequestError('Invalid event ID');

  const event = await eventService.getEvent(eventId);

  if (!event) return next(new NotFoundError('Event not found'));

  return res.json({ ...event });
};

// Delete an event by ID
export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId;

  if (!eventId) throw new BadRequestError('Invalid event ID');

  try {
    await eventService.deleteEvent(eventId);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

// Create a new event
export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  const { name, type, description, dateStart: _dateStart, place } = req.body;

  if (!name || !_dateStart || !place)
    throw new BadRequestError('Name, start date, and place are required');

  const dateStart = new Date(_dateStart);

  if (isNaN(dateStart.getTime())) {
    throw new BadRequestError('Invalid date format: expected ISO-8601 string');
  }
  const newEvent = await eventService.createEvent({ name, type, description, dateStart, place });

  return res.status(201).json({ event: newEvent });
};

// Update an event by ID
export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId;

  if (!eventId) throw new BadRequestError('Invalid event ID');

  const { name, type, description, dateStart, place } = req.body;

  if (!name && !dateStart && !place && !type && !description)
    throw new BadRequestError('At least one field is required to update');

  try {
    const updatedEvent = await eventService.updateEvent(eventId, {
      name,
      type,
      description,
      dateStart,
      place,
    });

    return res.json({ event: updatedEvent });
  } catch (error: any) {
    return next(error);
  }
};

// Update user attendance for an event
export const updateUserAttendance = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId;

  if (!eventId) throw new BadRequestError('Invalid event ID');

  const { userId, status } = req.body;

  if (!userId) throw new BadRequestError('User ID and status are required');

  const updatedAttendance = await eventService.updateUserAttendance(eventId, userId, status);

  return res.json({ attendance: updatedAttendance });
};

// Register a user for an event
export const registerUserForEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId;

  if (!eventId) throw new BadRequestError('Invalid event ID');

  const { userId } = req.body;

  if (!userId) return next(new BadRequestError('User ID is required'));

  const registration = await eventService.registerUser(eventId, userId);

  return res.status(201).json({ registration });
};

// Unregister a user from an event
export const unregisterUserFromEvent = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.params.eventId;

  if (!eventId) throw new BadRequestError('Invalid event ID');

  const { userId } = req.body;

  if (!userId) return next(new BadRequestError('User ID is required'));

  await eventService.unregisterUser(eventId, userId);

  return res.status(204).send();
};
