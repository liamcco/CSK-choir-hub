import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { getGroups, getPermissions, getRoles, getUsers } from '@/lib/api-client';
import { getApiRequestHeaders } from '@/lib/api-auth';

import { AdminDashboard } from './admin-dashboard';

function getSingleSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getResponseErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'error' in error && typeof error.error === 'string') {
    return error.error;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return 'Could not load admin data.';
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const status = getSingleSearchParam(params.status);
  const message = getSingleSearchParam(params.message);

  const session = await authClient.getSession({ fetchOptions: { headers: await headers() } });

  if (!session.data?.session) {
    redirect('/login');
  }

  const sessionUser = session.data.user as typeof session.data.user & { role?: string | null };

  if (sessionUser.role?.toLowerCase() !== 'admin') {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-4 py-10">
        <Card className="w-full border-amber-200 bg-amber-50/70">
          <CardHeader>
            <CardTitle>Admin access required</CardTitle>
            <CardDescription>
              This route is reserved for users with the Better Auth admin role.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-zinc-700">
            Your current system role is <span className="font-medium">{sessionUser.role || 'user'}</span>.
          </CardContent>
        </Card>
      </div>
    );
  }

  const apiHeaders = await getApiRequestHeaders();
  const [usersResponse, groupsResponse, rolesResponse, permissionsResponse] = await Promise.all([
    getUsers({ headers: apiHeaders }),
    getGroups({ headers: apiHeaders }),
    getRoles({ headers: apiHeaders }),
    getPermissions({ headers: apiHeaders }),
  ]);

  if (
    usersResponse.data === undefined ||
    groupsResponse.data === undefined ||
    rolesResponse.data === undefined ||
    permissionsResponse.data === undefined
  ) {
    const errorMessage =
      getResponseErrorMessage(usersResponse.error) ||
      getResponseErrorMessage(groupsResponse.error) ||
      getResponseErrorMessage(rolesResponse.error) ||
      getResponseErrorMessage(permissionsResponse.error);

    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center px-4 py-10">
        <Card className="w-full border-red-200 bg-red-50/70">
          <CardHeader>
            <CardTitle>Admin data unavailable</CardTitle>
            <CardDescription>The RBAC endpoints responded, but the page could not assemble the dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-red-700">{errorMessage}</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <AdminDashboard
      users={usersResponse.data.users}
      groups={groupsResponse.data.groups}
      roles={rolesResponse.data.roles}
      permissions={permissionsResponse.data.permissions}
      status={status}
      message={message}
    />
  );
}
