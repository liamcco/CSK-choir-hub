'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/utils/ui/utils';

import { type FormState, createSongAction } from './actions';

export function CreateSongForm({ className, ...props }: React.ComponentProps<'div'>) {
  const initialState: FormState = {};
  const [state, formAction, pending] = useActionState(createSongAction, initialState);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Link
        href="/catalog/songs"
        className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'w-fit')}
      >
        Back to songs
      </Link>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create song</CardTitle>
          <CardDescription>Add a new song to the shared catalog.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </FieldLabel>
                <Input id="title" name="title" type="text" placeholder="Island" required />
                {state?.errors?.title && <FieldError>{state.errors.title[0]}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="startingTones">Starting tones</FieldLabel>
                <Input id="startingTones" name="startingTones" type="text" placeholder="A3" />
                {state?.errors?.startingTones && (
                  <FieldError>{state.errors.startingTones[0]}</FieldError>
                )}
              </Field>
              {state?.message && <p className="text-destructive text-sm">{state.message}</p>}
              <Field>
                <Button type="submit" disabled={pending}>
                  {pending && <Spinner className="mr-2" />}
                  {pending ? 'Creating...' : 'Create song'}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
