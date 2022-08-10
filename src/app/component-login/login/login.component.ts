import { Component, HostBinding } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interface/task';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { flagSpinner2 as spinnerFlagInterceptor, respuestaErrorCero } from 'src/app/jwt-interceptor.interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private taskService:TaskService,private cookieService: CookieService, private router: Router) { }

  
  @HostBinding('class') classes = 'row'
  user:Task ={
    usuario: '',
    password: ''
  };
  datosIncorrectos:boolean = false;
  spinnerFlag:boolean = false;
  banderaResputaCero:boolean = false;

  onSubmit() {
    this.banderaResputaCero = false;
    this.datosIncorrectos = false;
    this.spinnerFlag = true;
    this.user.password = btoa(this.user.password);
    this.taskService.createTask(this.user).subscribe(
      {
        next: (response) => {
          let objetoAJson = JSON.stringify(response);
          let JsonAObjeto = JSON.parse(objetoAJson);
          this.cookieService.set('userAuth', JsonAObjeto.access_token, 0.0104167 );
          this.router.navigate(['login/user'])      
           
        },
        error: (error) => {
          this.user.password = '';
          console.log(error);
          if (error.status == 0) {
            this.banderaResputaCero = respuestaErrorCero;
            this.spinnerFlag = spinnerFlagInterceptor;
          }else if (error.status == 400) {
            this.datosIncorrectos = true;
            this.spinnerFlag = false;
          }else if(error.status == 500){
            this.datosIncorrectos = false;
          }
          this.spinnerFlag = false
        },
        
      }
     
    );
  }

}
