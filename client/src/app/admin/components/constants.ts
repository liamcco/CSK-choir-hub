import type { GroupType, PermissionEffect } from '@/lib/api-client';

export const groupTypes: GroupType[] = [
  'CHOIR',
  'VOICE',
  'COMMITTEE',
  'BOARD',
  'CONDUCTORS',
  'OTHER',
];

export const permissionEffects: PermissionEffect[] = ['ALLOW', 'DENY'];

export const nativeSelectClassName =
  'border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-none border px-2.5 py-1 text-xs outline-none transition-colors focus-visible:ring-1';
