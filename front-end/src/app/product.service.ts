import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/market/market.component'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from './globals/globals';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private globals: Globals) { }
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3004/list_products/news/10', this.header())
  }

  getProduct(productId:number): Observable<Product>{
    return this.http.get<Product>("http://localhost:3004/product/" + productId, this.header());
  }

  adicionar(product: Product): Observable<any>{
    console.log("post product")
    return this.http.post("http://localhost:3004/product", product, this.header());
  }

  editar(product: Product): Observable<any>{
    return this.http.put("http://localhost:3004/product/" + product.id, product, this.header());
  }
  remover(productId:number): Observable<any>{
    return this.http.delete("http://localhost:3004/product/"+productId, this.header());
  }

  header(){
    return {
      headers : new HttpHeaders({'Content-Type':'application/json', 
      'x-access-token':this.globals.loginData.token})
    }
  }
}
