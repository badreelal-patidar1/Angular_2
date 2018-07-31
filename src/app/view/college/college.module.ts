import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { RouterModule } from '@angular/router';
import { COLLEGE_ROUTES } from './college.routes';
import { CollegeComponent } from './college.component';
import { CollegeCreateComponent } from './college-create/college-create.component';
import { CollegeListComponent } from './college-list/college-list.component';
import { CollegeUpdateComponent } from './college-update/college-update.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(COLLEGE_ROUTES),
    ],
    declarations: [
        CollegeComponent,
        CollegeCreateComponent,
        CollegeListComponent,
        CollegeUpdateComponent,
    ],
    exports: [CollegeComponent]
})
export class CollegeModule { }
