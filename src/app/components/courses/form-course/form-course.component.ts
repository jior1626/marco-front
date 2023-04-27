import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-course',
  templateUrl: './form-course.component.html',
  styleUrls: ['./form-course.component.css']
})
export class FormCourseComponent implements OnInit {

  	courseForm: FormGroup;
	formSubmit = false;
	actionForm: number = 1;
	protected courseId: any;

	@Input()
	set course(data: Course) {
		if (data != undefined && data != null) {
			this.courseId = data.id;
			this.actionForm = (data.id != null || data.id != undefined) ? 2 : 1;
			this.courseForm.patchValue({
				name: data.name,
				startDate: data.startDate,
				endDate: data.endDate
			})
			this.formSubmit = false;
		}
	}

	@Input()
	set showForm(show: boolean) {
		if(!show) {
			this.onReset();
		}
	}

	@Output() loadUsers = new EventEmitter();

	constructor(
		public fb: FormBuilder,
		private courseServices: CourseService
	) {

		this.courseForm = new FormGroup({
			name:  new FormControl('', [Validators.required]),
			startDate: new FormControl('', Validators.required),
			endDate: new FormControl('', Validators.required),
		});
		
	}

	ngOnInit(): void {
	}

	get f(): { [key: string]: AbstractControl } {
		return this.courseForm.controls;
	}

	showAlert(type: any, title: string, message: string) {
        Swal.fire({
            icon: type,
            title: title,
            text: message,
        })
    }

	onFormSubmit() {

		let data = this.courseForm.value;
		this.formSubmit = true;

		if (this.courseForm.invalid) {
			this.showAlert('error', 'Oopps', 'Hay campos vacios')
			return;
		}
		if(this.actionForm == 1) {
			this.courseServices.saveCourse(data).subscribe((response: Response) => {
				this.showAlert('success', 'Correcto', 'Información Guardada correctamente');
				this.showForm = false;
				this.onReset();
			});
		} else {
			this.courseServices.updateCourse(data, this.courseId).subscribe((response: Response) => {
				this.showAlert('success', 'Correcto', 'Información Actualizada correctamente');
				this.showForm = false;	
				this.onReset();
			});
		}
	}

	onReset(): void {
		this.formSubmit = false;
		this.courseForm.reset();
		this.actionForm == 1;
	}

}
