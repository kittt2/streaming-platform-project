import React, { lazy, memo, Suspense } from 'react';
import { SkeletonDemo } from './Skeletonui';

const Aisearch = lazy(() => import('./Aisearch'));

function Contact() {
  return (
    <div className='w-screen bg-black'>
      <Suspense fallback={<SkeletonDemo/>}>
        <Aisearch />
      </Suspense>
    </div>
  );
}

export default memo( Contact);
