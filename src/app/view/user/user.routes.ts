import { Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';

export const USER_ROUTES: Routes = [
    {
        path: 'UserList',
        component: UserComponent
    },
    {
        path: 'UserCreate',
        component: UserCreateComponent
    },
    {
        path: 'UserUpdate/:id',
        component: UserUpdateComponent
    }
];
