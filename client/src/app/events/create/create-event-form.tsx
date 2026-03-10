'use client';

import { useActionState } from 'react';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/utils/ui/utils';

import { FormState, createEventAction } from './actions';

const eventTypes = ['REHEARSAL', 'CONCERT', 'GIG', 'PARTY', 'MEETING', 'OTHER'] as const;

export function CreateEventForm({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations();
  const initialState: FormState = {};
  const [state, formAction, pending] = useActionState(createEventAction, initialState);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create event</CardTitle>
          <CardDescription>Fill in the event details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </FieldLabel>
                <Input id="name" name="name" type="text" placeholder="Spring Concert" required />
                {state?.errors?.name && <FieldError>{state.errors.name[0]}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="type">
                  Type <span className="text-destructive">*</span>
                </FieldLabel>
                <Select id="type" name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((eventType) => (
                      <SelectItem key={eventType} value={eventType}>
                        {eventType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {state?.errors?.type && <FieldError>{state.errors.type[0]}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Optional"
                  maxLength={240}
                />
                {state?.errors?.description && (
                  <FieldError>{state.errors.description[0]}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="dateStart">
                  Start date <span className="text-destructive">*</span>
                </FieldLabel>
                <Input id="dateStart" name="dateStart" type="datetime-local" required />
                {state?.errors?.dateStart && <FieldError>{state.errors.dateStart[0]}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="dateEnd">End date</FieldLabel>
                <Input id="dateEnd" name="dateEnd" type="datetime-local" />
                {state?.errors?.dateEnd && <FieldError>{state.errors.dateEnd[0]}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="place">
                  Place <span className="text-destructive">*</span>
                </FieldLabel>
                <Input id="place" name="place" type="text" placeholder="Main Hall" required />
                {state?.errors?.place && <FieldError>{state.errors.place[0]}</FieldError>}
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="requiresAttendance">Requires attendance</FieldLabel>
                <Input
                  id="requiresAttendance"
                  type="checkbox"
                  name="requiresAttendance"
                  className="border-input h-4 w-4 border bg-transparent"
                />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="requiresRegistration">Requires registration</FieldLabel>
                <Input
                  id="requiresRegistration"
                  type="checkbox"
                  name="requiresRegistration"
                  className="border-input h-4 w-4 border bg-transparent"
                />
              </Field>
              {state?.errors?.requiresAttendance && (
                <FieldError>{state.errors.requiresAttendance[0]}</FieldError>
              )}
              {state?.errors?.requiresRegistration && (
                <FieldError>{state.errors.requiresRegistration[0]}</FieldError>
              )}
              {state?.message && <p className="text-destructive text-sm">{state.message}</p>}
              <Field>
                <Button type="submit" disabled={pending}>
                  {pending && <Spinner className="mr-2" />}
                  {pending ? 'Creating...' : 'Create event'}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
