  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { InfoPagina } from '../interfaces/info-pagina.interface';

  @Injectable({
    providedIn: 'root'
  })
  export class InfoPaginaService {

    info: InfoPagina = {};
    cargada = false;
    equipo: any[] = [];

    constructor( private http: HttpClient ) {

      // this.cargarInfo();
      this.cargarEquipo();

    }

    private  cargarInfo() {
      //  Leer el archivo Json
      this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.cargada = true;
        this. info = resp;
        // console.log(resp);
        // console.log(resp['email']);

      });

    }

    private cargarEquipo() {
      //  Cargar desde url Json
      this.http.get('https://angular-html-86dfb.firebaseio.com/equipo.json')
      .subscribe( (resp: any ) => {
        this. equipo = resp;
        console.log(resp);
        // console.log(resp['email']);

      });
    }

  }



