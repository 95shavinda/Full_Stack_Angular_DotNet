import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  users !: Observable<User[]>;

  userServices = inject(UsersService);

  ngOnInit(): void {
    this.users = this.userServices.getAllUsers();
  }
}
