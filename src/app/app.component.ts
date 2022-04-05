import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Impiegato } from './impiegato';
import { ImpiegatoService } from './impiegato.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 public impiegati: Impiegato[] = [];
 public editEmployee: Impiegato | undefined;
 public deleteEmployee!: Impiegato ;

constructor(private impiegatoService: ImpiegatoService){

}

   ngOnInit(): void {
    this.getImpiegati();
  }


public getImpiegati(): void{

  this.impiegatoService.getImpiegati().subscribe(
( response: Impiegato[])=>{
this.impiegati= response;
},
( error: HttpErrorResponse) => {
  alert( error.message);
}

 );
}

public onAddEmployee( addForm: NgForm): void{
  document.getElementById('add-employee-form')?.click();
this.impiegatoService.addImpiegato(addForm.value )
.subscribe(
( response: Impiegato) =>{
 console.log( response);
 this.getImpiegati();
},
(error: HttpErrorResponse)=>{
  alert(error.message);
  addForm.reset();
}


)

}

public eliminaAggiornaImpiegato( impiegato: Impiegato, azione: string): void{

   var container= document.getElementById('main-container');
   const button= document.createElement('button');
   button.type= 'button';
   button.style.display= 'none';
   button.setAttribute( 'data-toggle','modal');

   if ( azione === 'add'){
    button.setAttribute( 'data-target','#addImpiegatoModal');

   }

   if ( azione === 'edit'){
     this.editEmployee= impiegato;
       button.setAttribute( 'data-target','#updateImpiegatoModal');

   }

   if ( azione === 'delete'){
    this.deleteEmployee = impiegato;
    button.setAttribute( 'data-target','#deleteImpiegatoModal');

   }
   if ( container!==null){
    container.appendChild(button);
    button.click();
   }

  }

  public aggiungiImpiegato(): void{

   var container= document.getElementById('main-container');
    const button= document.createElement('button');
    button.type= 'button';
    button.style.display= 'none';
    button.setAttribute( 'data-toggle','modal');
    button.setAttribute( 'data-target','#addEmployeeModal');
    if ( container!==null){
      container.appendChild(button);
      button.click();
     }

  }

  public onUpdateEmloyee(employee:  Impiegato): void {
    this.impiegatoService.updateImpiegato(employee).subscribe(
      (response: Impiegato) => {
        console.log(response);
        this.getImpiegati();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void {
    this.impiegatoService.deleteImpiegato(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getImpiegati();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Impiegato[] = [];
    for (const employee of this.impiegati) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.telefono.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.ruolo.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.impiegati = results;
    if (results.length === 0 || !key) {
      this.getImpiegati();
    }
  }




}
