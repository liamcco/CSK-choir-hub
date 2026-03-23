import { Context } from 'hono';

import { userService } from '@/services';

export const getUsers = async (c: Context) => {
  const search = c.req.query('search');
  const users = await userService.getAllUsers(search);

  return c.json({ users });
};
