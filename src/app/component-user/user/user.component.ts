import { Component, HostBinding, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskPelis } from '../../interface/task'
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { flagSpinner2 as spinnerFlagInterceptor } from 'src/app/jwt-interceptor.interceptor';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  constructor(private taskServie: TaskService, private cookieService: CookieService) { }
  movies: TaskPelis[] = [{
    ID: 0,
    Titulo: '',
    Puntuacion: 0
  }];
  spinnerFlag:boolean = false;
  ngOnInit(): void {
    this.getPelis();
  }

  getPelis() {
    this.spinnerFlag = true;
    this.taskServie.getAllTasks().subscribe(
      {
        next: (response) => {
          this.spinnerFlag = false;
          this.movies = response
        },
        error: (error) => {
          console.log(error);
          if (error.status == 500) {
            this.spinnerFlag = spinnerFlagInterceptor;
          }
          this.spinnerFlag = false;
        },
      }
    ); 
  }

  deleteMovie(id: number) {
    this.taskServie.deleteTask(id).subscribe(
      {
        next: (response) => {
          this.getPelis();
          console.log(response);
        },
        error: (error) => {
          console.log(error);
          if (error.status == 500 || error.status == 400 || error.status == 0) {
            Swal.fire(
              {
                title: 'Servicio no disponible'
              },
             );
          }
          this.spinnerFlag = false;
        },
      }
    );
  }
}
