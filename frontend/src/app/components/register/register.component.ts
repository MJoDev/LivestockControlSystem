import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {  
  public myForm!:FormGroup;
  constructor(private fb:FormBuilder, private authservice: AuthService, private toastr: ToastrService){}
  ngOnInit(){
    this.myForm = this.createMyForm();
  }


  private createMyForm():FormGroup{
    return this.fb.group({
      user:['', Validators.required],
      password:['', Validators.required],
    });
  }
  public submitForm(){
    //Si no estan llenos los dos, el formulario es invalido
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control =>{
        control.markAllAsTouched();
      });
      return;
    }
    else{
      
      console.log(this.myForm.value);

      this.authservice.signIn(this.myForm.value)
        .subscribe(
          res => {
            localStorage.setItem('token', res.token);
            this.toastr.error('El usuario ya existe', 'Ha ocurrido un error');
          },
          err => {
            this.authservice.signUp(this.myForm.value)
              .subscribe(
                res => {console.log(res);
                  localStorage.setItem('token', res.token);
                  this.toastr.success('Ha registrado un usuario con exito', 'Usuario registrado');
                },
                err => {console.log(err); 
                  this.toastr.error('El usuario ya existe', 'Ha ocurrido un error');}
              )
          }
         )    
    }
    
  }

  public get f():any{
    return this.myForm.controls;
  }
}
