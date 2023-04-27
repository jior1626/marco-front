import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';


const routes: Routes = [
	{
		path: '',
		component: CoursesComponent,
		// children: [
		// 	{
		// 		path: ':id/cars',
		// 		component: CarsComponent
		// 	}
		// ]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
