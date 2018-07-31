import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { RouterModule } from '@angular/router';
import { USER_ROUTES } from './user.routes';
import { UserComponent } from './user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(USER_ROUTES),
    ],
    declarations: [
        UserComponent,
        UserCreateComponent,
        UserUpdateComponent,
        UserListComponent
    ],
    exports: [UserComponent]
})
export class UserModule { }
