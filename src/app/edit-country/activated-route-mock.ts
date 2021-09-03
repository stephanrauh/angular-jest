import { ActivatedRoute, Data, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export const mockActivatedRoute = {
  provide: ActivatedRoute,
  useValue: {
    data: new BehaviorSubject<any>({country: 'spain'}),
    params: new BehaviorSubject<string>('spain'),
    snapshot: {
      url: [
        {
          path: 'country',
        },
        {
          path: 'Spain',
        },
      ],
    },
  },
};
