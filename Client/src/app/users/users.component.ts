import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  users$ !: Observable<User[]>;

  userServices = inject(UsersService);

  constructor(private toastService : ToastrService){}
  
  ngOnInit(): void {
    this.getUsers();
  }

  delete(id:number){
    this.userServices.deleteUser(id).subscribe({
      next:(response)=>{
        this.toastService.success("Successfully Deleted");
        this.getUsers();
      }
    })
  }

  private getUsers():void{
    this.users$ = this.userServices.getAllUsers();
  }
}
