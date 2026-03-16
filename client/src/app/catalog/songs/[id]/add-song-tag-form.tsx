'use client';

import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';

import { type AssignTagFormState, assignTagToSongAction } from './actions';

type TagOption = {
  id: string;
  name: string;
};

export function AddSongTagForm({
  songId,
  availableTags,
}: {
  songId: string;
  availableTags: TagOption[];
}) {
  const initialState: AssignTagFormState = {};
  const action = assignTagToSongAction.bind(null, songId);
  const [state, formAction, pending] = useActionState(action, initialState);

  if (availableTags.length === 0) {
    return <p className="text-muted-foreground text-sm">All existing tags are already assigned.</p>;
  }

  return (
    <form action={formAction} className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="tagId">Add tag</FieldLabel>
          <Select name="tagId" required>
            <SelectTrigger id="tagId" className="w-full">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              {availableTags.map((tag) => (
                <SelectItem key={tag.id} value={tag.id}>
                  {tag.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state?.errors?.tagId && <FieldError>{state.errors.tagId[0]}</FieldError>}
        </Field>
        {state?.message && <p className="text-destructive text-sm">{state.message}</p>}
        <Field>
          <Button type="submit" disabled={pending}>
            {pending && <Spinner className="mr-2" />}
            {pending ? 'Adding...' : 'Add tag'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
