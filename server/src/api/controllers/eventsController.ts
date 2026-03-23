import { Context } from 'hono';

import { eventService } from '@/services';
import { BadRequestError, NotFoundError, UnauthorizedError } from '@/utils/errors';

// Get all events
export const getEvents = async (c: Context) => {
  const events = await eventService.getAllEvents();

  return c.json({ events });
};

// Get event details by ID
export const getEventDetail = async (c: Context) => {
  const eventId = c.req.param('id');

  if (!eventId) throw new BadRequestError('Invalid event ID');

  const event = await eventService.getEvent(eventId);

  if (!event) throw new NotFoundError('Event not found');

  return c.json({ ...event });
};

// Delete an event by ID
export const deleteEvent = async (c: Context) => {
  const eventId = c.req.param('id');

  if (!eventId) throw new BadRequestError('Invalid event ID');

  await eventService.deleteEvent(eventId);

  return c.status(204);
};

// Create a new event
export const createEvent = async (c: Context) => {
  const user = c.get('user') as { id: string } | null;
  const { name, type, description, dateStart: _dateStart, place } = await c.req.json();

  if (!user?.id) throw new UnauthorizedError('Authentication required');

  if (!name || !_dateStart || !place)
    throw new BadRequestError('Name, start date, and place are required');

  const dateStart = new Date(_dateStart);

  if (isNaN(dateStart.getTime())) {
    throw new BadRequestError('Invalid date format: expected ISO-8601 string');
  }
  const newEvent = await eventService.createEvent({
    createdById: user.id,
    name,
    type,
    description,
    dateStart,
    place,
  });

  return c.json({ event: newEvent }, 201);
};

// Update an event by ID
export const updateEvent = async (c: Context) => {
  const eventId = c.req.param('eventId');

  if (!eventId) throw new BadRequestError('Invalid event ID');

  const { name, type, description, dateStart, place } = await c.req.json();

  if (!name && !dateStart && !place && !type && !description)
    throw new BadRequestError('At least one field is required to update');

  const updatedEvent = await eventService.updateEvent(eventId, {
    name,
    type,
    description,
    dateStart,
    place,
  });

  return c.json({ event: updatedEvent });
};

// Update user attendance for an event
export const updateUserAttendance = async (c: Context) => {
  const eventId = c.req.param('eventId');

  if (!eventId) throw new BadRequestError('Invalid event ID');

  const { userId, status } = await c.req.json();

  if (!userId) throw new BadRequestError('User ID and status are required');

  const updatedAttendance = await eventService.updateUserAttendance(eventId, userId, status);

  return c.json({ attendance: updatedAttendance });
};

// Register a user for an event
export const registerUserForEvent = async (c: Context) => {
  const eventId = c.req.param('eventId');

  if (!eventId) throw new BadRequestError('Invalid event ID');

  const { userId } = await c.req.json();

  if (!userId) throw new BadRequestError('User ID is required');

  const registration = await eventService.registerUser(eventId, userId);

  return c.json({ registration }, 201);
};

// Unregister a user from an event
export const unregisterUserFromEvent = async (c: Context) => {
  const eventId = c.req.param('eventId');

  if (!eventId) throw new BadRequestError('Invalid event ID');

  const { userId } = await c.req.json();

  if (!userId) throw new BadRequestError('User ID is required');

  await eventService.unregisterUser(eventId, userId);

  return c.status(204);
};
