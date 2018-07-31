import { Routes } from '@angular/router';
import { RoleCreateComponent } from './role-create/role-create.component';
import { RoleUpdateComponent } from './role-update/role-update.component';
import { RoleComponent } from './role.component';

export const ROLE_ROUTES: Routes = [
    {
        path: "RoleList",
        component: RoleComponent
    },
    {
        path: "RoleCreate",
        component: RoleCreateComponent
    },
    {
        path: "RoleUpdate/:id",
        component: RoleUpdateComponent
    }
];