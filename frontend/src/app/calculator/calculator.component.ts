import { Component } from '@angular/core';
import { CalculatorService } from '../_services/calculator.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  providers: [DatePipe]
})
export class CalculatorComponent {

  producto: number = 0;
  enReinversion: boolean = false;
  fechaCreacion: string = "";
  plazo: number = 1;

  products: any[] = [];
  investmentResponse: any = null;
  showError: boolean = false;
  errorText: string = "Hubo un error. Favor de revisar los campos.";

  constructor(private calculatorService: CalculatorService, private datePipe: DatePipe) {
    this.calculatorService.getProducts().subscribe(
      (products: any[]) => {
        this.products = products;
      },
      (error) => {
        console.error('Failed to fetch products:', error);
      }
    );
  }

  calculate() {
    this.investmentResponse = null;
    var dt =  this.datePipe.transform(this.fechaCreacion, 'yyyy-MM-dd HH:mm:ss')
    var investmentData = {
      producto: this.producto,
      enReinversion: this.enReinversion,
      fechaCreacion: dt,
      plazo: this.plazo
    };

    this.calculatorService.calculate(JSON.stringify(investmentData)).subscribe(
      (data: any[]) => {
        this.showError = false;
        this.investmentResponse = data;
      },
      (error) => {
        this.showError = true;
      }
    );
  }
}
