'use client';

import { useActionState } from 'react';

import Link from 'next/link';

import { buttonVariants, Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/utils/ui/utils';

import { type FormState, createBookAction } from './actions';

export function CreateBookForm({ className, ...props }: React.ComponentProps<'div'>) {
  const initialState: FormState = {};
  const [state, formAction, pending] = useActionState(createBookAction, initialState);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Link href="/books" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'w-fit')}>
        Back to books
      </Link>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create book</CardTitle>
          <CardDescription>Add a new song book to the overview.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </FieldLabel>
                <Input id="title" name="title" type="text" placeholder="Utantill" required />
                {state?.errors?.title && <FieldError>{state.errors.title[0]}</FieldError>}
              </Field>
              {state?.message && <p className="text-destructive text-sm">{state.message}</p>}
              <Field>
                <Button type="submit" disabled={pending}>
                  {pending && <Spinner className="mr-2" />}
                  {pending ? 'Creating...' : 'Create book'}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
