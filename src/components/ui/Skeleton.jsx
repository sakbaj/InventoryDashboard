import React from 'react';
import clsx from 'clsx';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={clsx("animate-pulse rounded-md bg-gray-200 dark:bg-gray-700", className)}
      {...props}
    />
  );
};
