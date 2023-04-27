import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

	showForm: boolean = false;
	courseData: Course = {};

	constructor() { }

	ngOnInit() {
	}

	editCourse(data: Course) {
		this.courseData = data;
		this.showForm = true;
	}

	createCourse() {
		this.courseData = {};
		this.showForm = true;
	}

	listCourses() {
		this.courseData = {};
		this.showForm = false;
	}

}
