import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { AutService } from '../aut.service';
import { Router, Route } from '@angular/router';
import { User } from './user';
import { DashboardComponent } from '../../views/accueil/dashboard/dashboard.component';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public LoginForm!: FormGroup;
  isSubmitted  =  false;

constructor(private autService: AutService,
            private router: Router, 
            private formBuilder: FormBuilder)
{}

  ngOnInit(): void {
    this.LoginForm=this.formBuilder.group({
      username: ['',[Validators.required,Validators.minLength(4)]],
      password: ['',[Validators.required,Validators.minLength(4)]],
    })

    
  }

  get formControls() { return this.LoginForm.controls; }



  loginFonction(){
    this.autService.login(this.LoginForm.value).subscribe({
      next:(result: string | null)=>{
        if(result!=null){
          localStorage.setItem('token', result)
          localStorage.getItem('token')
          this.router.navigateByUrl('Dashboard')
        }
        console.log(result);
  
      },error:(err: any)=>{
        console.log(err);
  
      }
    })
  
    }
  }
