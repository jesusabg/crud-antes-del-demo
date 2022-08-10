import { Component, HostBinding, OnInit } from '@angular/core';
import { TaskPelis } from '../../interface/task';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2';
import { flagSpinner2 as spinnerFlagInterceptor } from 'src/app/jwt-interceptor.interceptor';
@Component({
  selector: 'app-peliculasform',
  templateUrl: './peliculasform.component.html',
})
export class PeliculasformComponent implements OnInit {

  constructor(private taskService:TaskService , private router: Router, private activedRoute:ActivatedRoute) { }
  @HostBinding('class') classes = 'row';

  movie: TaskPelis = {
    ID: 0,
    Titulo: '',
    Puntuacion: 0
  };
  spinnerFlag:boolean = false;
  edit:boolean = false;

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params['id']) {
      this.spinnerFlag = true;
        this.taskService.getTask(params['id'])
        .subscribe(
          {
            next: (response) => { 
              this.spinnerFlag = false;
              this.movie = response;
              this.edit = true;
            },
            error: (error) => {
              console.log(error);
              if (error.status == 500) {
                this.spinnerFlag = spinnerFlagInterceptor;
              }
              this.spinnerFlag = false;
            },
          }
        )
    }

  }

  onSubmit() {
    if(this.edit){
      this.updateMovie();
    }else{
      this.saveMovie();
    }
    
  }

  updateMovie(){
    this.spinnerFlag = false;
    this.taskService.updateTask(this.movie)
    .subscribe(
      {
        next: (response) => {
          this.spinnerFlag = false;
          console.log(response);
          
          this.router.navigate(['/login/user']);
        },
        error: (error) => {
          console.log(error);
          console.log('Update method');
          if (error.status == 500) {
            this.spinnerFlag = spinnerFlagInterceptor;
          }
          this.spinnerFlag = false;
        },
      }
    );
  }

  saveMovie() {
    this.spinnerFlag = true;
    this.taskService.createTaskFormPelis(this.movie).subscribe(
      {
        next: (response) => {
          this.router.navigate(['/login/user']);
          console.log(response)
        },
        error: (error) => {
          console.log(error);
          console.log('Save method');
          if (error.status == 500) {
            this.spinnerFlag = spinnerFlagInterceptor;
          }
          this.spinnerFlag = false;
        },
      }
    );
  }

}
