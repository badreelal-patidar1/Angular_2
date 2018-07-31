import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { RouterModule } from '@angular/router';
import { MARKSHEET_ROUTES } from './marksheet.routes';
import { MarksheetComponent } from './marksheet.component';
import { MarksheetCreateComponent } from './marksheet-create/marksheet-create.component';
import { MarksheetUpdateComponent } from './marksheet-update/marksheet-update.component';
import { MarksheetListComponent } from './marksheet-list/marksheet-list.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(MARKSHEET_ROUTES),
    ],
    declarations: [
        MarksheetComponent,
        MarksheetCreateComponent,
        MarksheetUpdateComponent,
        MarksheetListComponent
    ],
    exports: [MarksheetComponent]
})
export class MarksheetModule { }
