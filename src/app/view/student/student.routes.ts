import { Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentUpdateComponent } from './student-update/student-update.component';

export const STUDENT_ROUTES: Routes = [
    {
        path: 'StudentList',
        component: StudentComponent
    },
    {
        path: 'StudentCreate',
         component: StudentCreateComponent
    },
    {
        path: 'StudentUpdate/:id',
         component: StudentUpdateComponent
    }

];
