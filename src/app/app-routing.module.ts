import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Route guards
const routes: Routes = [
  {
    path: '',
    loadChildren: './view/home/home.module#HomeModule',
  },
  {
    path: 'college',
    loadChildren: './view/college/college.module#CollegeModule',

  },
  {
    path: 'role',
    loadChildren: './view/role/role.module#RoleModule',

  },
  {
    path: 'marksheet',
    loadChildren: './view/marksheet/marksheet.module#MarksheetModule',

  },
  {
    path: 'student',
    loadChildren: './view/student/student.module#StudentModule',

  },
  {
    path: 'user',
    loadChildren: './view/user/user.module#UserModule',

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
