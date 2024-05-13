import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
  { path: 'calculator', component: CalculatorComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'calculator', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
