import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { RouterModule } from '@angular/router';
import { STUDENT_ROUTES } from './student.routes';
import { StudentComponent } from './student.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(STUDENT_ROUTES),
    ],
    declarations: [
        StudentComponent,
        StudentCreateComponent,
        StudentUpdateComponent,
        StudentListComponent,

    ],
    exports: [StudentComponent]
})
export class StudentModule { }
