import { Suspense } from 'react';

import { CreateSongForm } from './create-song-form';
import { CreateSongFormSkeleton } from './create-song-form-skeleton';

export default function CreateSongPage() {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 sm:px-6">
      <div className="w-full max-w-sm">
        <Suspense fallback={<CreateSongFormSkeleton />}>
          <CreateSongForm />
        </Suspense>
      </div>
    </div>
  );
}
