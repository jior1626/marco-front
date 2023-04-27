import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Course } from 'src/app/models/course';
import { Response } from 'src/app/models/response';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-list-courses',
	templateUrl: './list-courses.component.html',
	styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {

	courses: Course[] = [];

	@Output() editCourseEvent = new EventEmitter();

	constructor(
		private courseServices: CourseService
	) { }

	ngOnInit() {
		this.listCourses();
	}

	listCourses() {
		this.courseServices.getAllCourses().subscribe((results: Course[]) => {
			this.courses = results;
		});
	}

	editCourse(item: Course) {
		this.editCourseEvent.emit(item);
	}

	deleteCourse(item: Course) {
		Swal.fire({
			title: 'Estas seguro de borrar este curso?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Borrar Registro',
			allowOutsideClick: false,
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				await this.courseServices.deleteCourse(item.id).subscribe((response: any) => {
					Swal.fire('Borrado Correctamente!', response.message, 'success');
					this.listCourses();
				});
			}
		})
	}

}
