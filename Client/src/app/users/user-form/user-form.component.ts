import { JsonPipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit, OnDestroy{

  form !: FormGroup;
  userFormSubscription !: Subscription;
  paramsSubscription !: Subscription;
  userServices = inject(UsersService);

  
  isEdit = false;
  id = 0;

  constructor(private fb : FormBuilder, private activatedRouter: ActivatedRoute, private router: Router, private toastService: ToastrService){}

  ngOnDestroy(): void {
    if(this.userFormSubscription){
      this.userFormSubscription.unsubscribe();
    }
    if(this.paramsSubscription){
      this.paramsSubscription.unsubscribe();
    }
  }

  onSubmit(){
    if(!this.isEdit){
      this.paramsSubscription = this.userServices.addUser(this.form.value).subscribe({
        next:(response)=>{
        this.toastService.success("User successfully added");
        this.router.navigateByUrl('/users');
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    else{
      this.userServices.updateUser(this.id,this.form.value).subscribe({
        next:(response)=>{
          this.toastService.success("Successfully updated");
          this.router.navigateByUrl("/users");
        },
        error:(err)=>{
          this.toastService.error("Unable to update");
        }
      })
    }

  }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe({
      next:(respose)=>{
        let id = respose['id'];
        this.id = id;
        if(!id) return;
        this.userServices.getUserById(id).subscribe({
          next:respose=>{
            this.form.patchValue(respose);
            this.isEdit = true;
          },
          error:err=>{
            console.log(err);
          }
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this.form = this.fb.group({
      name : ['',Validators.required],
      address : [],
      phoneNumber : [],
      email:['',Validators.email]
    })
  }
}
