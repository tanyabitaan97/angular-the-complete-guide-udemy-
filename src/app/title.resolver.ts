import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';

export const titleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id');
  return `User ${id} Details`;
};
