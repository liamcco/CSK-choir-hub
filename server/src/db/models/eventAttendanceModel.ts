import { prisma } from '@/db';
import { type AttendanceStatus } from '@/prisma/generated/client';

/**
 * Update the attendance status of a user for a specific event.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user.
 */
export async function updateUserEventAttendanceStatus(
  userId: string,
  eventId: string,
  status: AttendanceStatus,
) {
  return await prisma.eventAttendance.create({
    data: {
      user: { connect: { id: userId } },
      event: { connect: { id: eventId } },
      status: status,
    },
  });
}

/**
 * Remove a user's attendance for a specific event.
 * @param userId - The ID of the user.
 * @param eventId - The ID of the event.
 */
export async function removeUserEventAttendance(userId: string, eventId: string) {
  return await prisma.eventAttendance.deleteMany({
    where: { userId: userId, eventId: eventId },
  });
}
