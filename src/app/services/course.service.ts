import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';

@Injectable()
export class CourseService {

    constructor(private http: HttpClient) { }

    getCourses() {
		const urlAPI = environment.ApiUrl;
		return this.http.get(`${urlAPI}/api/courses`);
	}

	getCourseById(id: any) {
		const urlAPI = environment.ApiUrl;
		return this.http.get(`${urlAPI}/api/courses/${id}`);
	}

	saveCourse(car:  Course) {
		const urlAPI = environment.ApiUrl;
		return this.http.post(`${urlAPI}/api/courses`, car);
	}

	updateCourse(car:  Course) {
		const urlAPI = environment.ApiUrl;
		return this.http.put(`${urlAPI}/api/courses`, car);
	}

	deleteCourse(id:  any) {
		const urlAPI = environment.ApiUrl;
		return this.http.delete(`${urlAPI}/api/courses/${id}/delete`);
	}

}
