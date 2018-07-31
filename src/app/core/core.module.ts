import { NgModule, ModuleWithProviders } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './../header/header.component';
import { FooterComponent } from './../footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
    ],
    exports: [
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        FooterComponent,
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                Title,
            ]
        };
    }
}
