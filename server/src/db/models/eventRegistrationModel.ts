import { prisma } from '@/db';

/**
 * Add registration: register a user for an event.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user.
 * @param comments - Optional comments from the user.
 * @param dietaryPreferences - Optional dietary preferences from the user.
 */
export async function addRegistration(
  eventId: string,
  userId: string,
  comments?: string,
  dietaryPreferences?: string,
) {
  return await prisma.eventRegistration.create({
    data: { eventId, userId, comments, dietaryPreferences },
  });
}

/**
 * Remove a user's registration for a specific event.
 * @param userId - The ID of the user.
 * @param eventId - The ID of the event.
 */
export async function removeUserEventRegistration(userId: string, eventId: string) {
  return await prisma.eventRegistration.deleteMany({
    where: { userId: userId, eventId: eventId },
  });
}

/**
 * List registrations for an event.
 * @param eventId - The ID of the event.
 */
export async function listRegistrations(eventId: string) {
  return await prisma.eventRegistration.findMany({
    where: { eventId },
    include: { user: true },
  });
}
