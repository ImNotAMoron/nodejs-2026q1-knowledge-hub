import { HttpException, HttpStatus } from '@nestjs/common';
import { SortOrder } from '../enums/sort.order';

export function sort<T>(elements: T[], sortBy: string, order: SortOrder): T[] {
  return elements.sort((elementA, elementB) => {
    const a = elementA[sortBy];
    const b = elementB[sortBy];
    if (a === undefined || b === undefined)
      throw new HttpException(
        `Property ${sortBy} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    const cmp = typeof a === 'string' ? a.localeCompare(b) : a - b;
    return cmp * (order === 'asc' ? 1 : -1);
  });
}
