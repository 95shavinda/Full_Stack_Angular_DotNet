import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';

export const routes: Routes = [
    {
        path:"users",
        component: UsersComponent
    },
    {
        path:"user/form",
        component:UserFormComponent
    },
    {
        path:"users/:id",
        component:UserFormComponent
    }
];
