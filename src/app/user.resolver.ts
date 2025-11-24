import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';

export const userResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id');
  return Promise.resolve({ id, name: 'User #' + id });
};
