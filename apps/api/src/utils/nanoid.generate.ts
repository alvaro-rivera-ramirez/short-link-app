import { nanoid } from 'nanoid';

export const nanoidDefault = (size: number): string => {
  return nanoid(size);
};
