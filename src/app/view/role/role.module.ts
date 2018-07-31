import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { RouterModule } from '@angular/router';
import { ROLE_ROUTES } from './role.routes';
import { RoleComponent } from './role.component';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleUpdateComponent } from './role-update/role-update.component';
@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(ROLE_ROUTES),
    ],
    declarations: [
        RoleComponent,
        RoleCreateComponent,
        RoleListComponent,
        RoleUpdateComponent
    ],
    exports: [RoleComponent]
})
export class RoleModule { }
