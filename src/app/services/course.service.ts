import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, throwError } from "rxjs";
import { catchError,  } from 'rxjs/operators';


import { Course } from '../models/course';
import Swal from 'sweetalert2';

@Injectable()
export class CourseService {

    headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	constructor(private http: HttpClient) {
	}

	getAllCourses(): Observable<Course[]> {
		const urlAPI = environment.ApiUrl;
		return this.http.get<Course[]>(`${urlAPI}/api/courses`, {
			headers: this.headers
		}).pipe(
			catchError(this.errorHandler)
		)
	}

	getCourseById(id: any): Observable<Course> {
		const urlAPI = environment.ApiUrl;
		return this.http.get<Course>(`${urlAPI}/api/courses/${id}`, {
			headers: this.headers
		}).pipe(
			
			catchError(this.errorHandler)
		);
	}

	saveCourse(car: Course): Observable<Response> {
		const urlAPI = environment.ApiUrl;
		return this.http.post<any>(`${urlAPI}/api/courses`, car, {
			headers: this.headers
		}).pipe(
			catchError(this.errorHandler)
		)
	}

	updateCourse(car: Course, id: any): Observable<Response> {
		const urlAPI = environment.ApiUrl;
		return this.http.put<any>(`${urlAPI}/api/courses/${id}`, car, {
			headers: this.headers
		}).pipe(
			catchError(this.errorHandler)
		)
	}

	deleteCourse(id: any) {
		const urlAPI = environment.ApiUrl;
		return this.http.delete<Response>(`${urlAPI}/api/courses/${id}`, {
			headers: this.headers
		}).pipe(
			catchError(this.errorHandler)
		)
	}

	errorHandler(error: any) {
		let errorMessage = '';
		let messageAlert = '';
		if(error.error instanceof ErrorEvent) {
			// Get client-side error
			messageAlert = error.error.message;
			errorMessage = error.message;
		} else {
			// Get server-side error
			let arrayErrors = error.error?.errors ? error.error?.errors : {};
			let arrayErrorsKeys = Object.keys(arrayErrors);
		  	if(arrayErrorsKeys.length > 0) {
				messageAlert = '<ul class="d-flex flex-column justify-content-center align-items-center text-center">';
				arrayErrorsKeys.forEach((item: any) => {
					messageAlert += `<li class="text-danger">${error.error?.errors[item]}</li>`;
				})
				messageAlert += '</ul>'
			} else {
				errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
			}
			errorMessage = error.message;
		}
		
		Swal.fire({
            icon: "error",
            title: "Ha ocurrido un error!",
			html: messageAlert,
        })
		return throwError(errorMessage);
	}

}
