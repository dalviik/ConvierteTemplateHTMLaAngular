import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  public cargando =  true;
  productos: Producto[] = [];
  productosFiltrado : Producto[] = [];
  
  constructor( private http: HttpClient ) {
    
    this.cargarProductos();
    
  }
  
  private cargarProductos() {
    
    return new Promise( (resolve, reject) => {
      
      this.http.get('https://angular-html-86dfb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
        
      });
      
    });
    
  }
  
  getProducto( id: string ) {
    return this.http.get(`https://angular-html-86dfb.firebaseio.com/productos/${ id }.json`);
    
  }
  
  buscarProducto( termino: string ) {
    
    if ( this.productos.length === 0 ){
      // Si no hay productos, se vuelven a cargar
      this.cargarProductos().then( ()=> {
        // Ejecutar despues de tener los productos
        // Aplicar el filtro        
        this.filtarProductos( termino );
        
      });
      
    } else {
      
      this.filtarProductos( termino );

    }
    this.cargando = true;
    
  }
  
  private filtarProductos( termino: string ) {
    
    // console.log(this.productos);
    this.productosFiltrado = [];
    
    termino = termino.toLocaleLowerCase();
    
    this.productos.forEach( prod => {
      
      const tituloLower = prod.titulo.toLocaleLowerCase();
      
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 )  {
        
        this.productosFiltrado.push( prod );
        
      }
      
    });
    
    setTimeout(()=> {
      this.cargando = false;
    },1250) ;
    
  }
  
  
}
