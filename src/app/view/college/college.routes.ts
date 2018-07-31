import { Routes } from '@angular/router';
import { CollegeComponent } from './college.component';
import { CollegeCreateComponent } from "./college-create/college-create.component";
import { CollegeUpdateComponent } from './college-update/college-update.component';

export const COLLEGE_ROUTES: Routes = [
  {
    path: 'CollegeList',
    component: CollegeComponent
  },
  {
    path: 'CollegeCreate',
    component: CollegeCreateComponent
  },
  {
    path: 'CollegeUpdate/:id',
    component: CollegeUpdateComponent
  }

];
