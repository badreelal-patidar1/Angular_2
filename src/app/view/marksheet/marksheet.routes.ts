import { Routes } from '@angular/router';
import { MarksheetComponent } from './marksheet.component';
import { MarksheetCreateComponent } from './marksheet-create/marksheet-create.component';
import { MarksheetUpdateComponent } from './marksheet-update/marksheet-update.component';

export const MARKSHEET_ROUTES: Routes = [
    {
        path: 'MarksheetList',
        component: MarksheetComponent
    },
    {
        path: 'MarksheetCreate',
        component: MarksheetCreateComponent
    },
    {
        path: 'MarksheetUpdate/:id',
        component: MarksheetUpdateComponent
    }
];
