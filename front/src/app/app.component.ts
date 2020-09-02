import { Component } from '@angular/core';
import { ClienteserviceService } from './service/clienteservice.service';
import { Cliente } from './service/Cliente';

//Formilarios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  clientes : Cliente[];
  myFormCliente  : FormGroup;

  constructor( public servc:ClienteserviceService){}

  ngOnInit(){
    this.obtenerClientes()

    this.myFormCliente = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl('')
    });
  }

  obtenerClientes(){
    this.servc.getClientes().subscribe(respuesta=>{
      console.log(respuesta);
      return this.clientes = respuesta;
    });

  }

  ingresarDatos(){
    let nombre = this.myFormCliente.value.nombre;
    let apellido = this.myFormCliente.value.apellido
    let direccion = this.myFormCliente.value.direccion
    let telefono = this.myFormCliente.value.telefono
    let email = this.myFormCliente.value.email

    this.servc.addClientes(nombre,apellido,direccion,telefono,email)
    .subscribe(r=>{
      this.obtenerClientes()
      this.myFormCliente = new FormGroup({
        nombre: new FormControl(''),
        apellido: new FormControl(''),
        direccion: new FormControl(''),
        telefono: new FormControl(''),
        email: new FormControl('')
      });
    })
  }
}
