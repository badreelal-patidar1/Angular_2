import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routes';

import { HomeComponent } from './home.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HOME_ROUTES),
    ],
    declarations: [
        HomeComponent
    ],
    exports: [HomeComponent]
})

export class HomeModule { }
