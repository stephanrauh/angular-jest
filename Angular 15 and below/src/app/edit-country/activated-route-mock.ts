import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export const mockActivateRouteValue = {
  data: new BehaviorSubject<any>({data: 'some additional data'}),
  params: new BehaviorSubject<any>({country: 'Spain'}),
  snapshot: {
    url: [
      {
        path: 'country',
      },
      {
        path: 'Spain',
      },
    ],
  }
} as unknown as ActivatedRoute; // fancy typecast allows us to omit unused values

export const mockActivatedRoute = {
  provide: ActivatedRoute,
  useValue: mockActivateRouteValue
};
