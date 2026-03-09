'use client';

import { useActionState } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/ui/utils';

import { FormState, signin } from './actions';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations();
  const initialState: FormState = {};
  const [state, formAction, pending] = useActionState(signin, initialState);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your username and password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" type="text" name="username" placeholder="johndoe" />
                {state?.errors?.username && <p>{state.errors.username}</p>}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" name="password" />
                {state?.errors?.password && <p>{state.errors.password}</p>}
              </Field>
              <Field>
                <Button type="submit" disabled={pending}>
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
