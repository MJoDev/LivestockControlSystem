import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  public myForm!:FormGroup;
  public QrInfor!: string;

  constructor(private fb:FormBuilder, private authservice: AuthService, private router: Router, private toastr: ToastrService){}

  ngOnInit(){
    localStorage.removeItem('token');
    this.myForm = this.createMyForm();
  }  

  private createMyForm():FormGroup{
    return this.fb.group({
      user:['', Validators.required],
      password:['', Validators.required]
    });
  }
  public submitForm(){
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control =>{
        control.markAllAsTouched();
      });
      return;
    }
    //enviar la informacion
    else{
      this.authservice.signIn(this.myForm.value)
        .subscribe(
          res => {console.log(res);
            localStorage.setItem('token', res.token);
            this.router.navigate(['/inicio']);
            },
          err => {console.log(err); this.toastr.error('El usuario no existe, por favor, registrate', 'Datos Invalidos');}
          )
    }
    
  }

  public get f():any{
    return this.myForm.controls;
  }
}
