import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/market/market.component'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3004/list_products/news/10')
  }

  getProduct(productId:number): Observable<Product>{
    return this.http.get<Product>("http://localhost:3004/product/" + productId);
  }

  adicionar(product: Product): Observable<any>{
    console.log("post product")
    return this.http.post("http://localhost:3004/product", product);
  }

  editar(product: Product): Observable<any>{
    return this.http.put("http://localhost:3004/product/" + product.id, product);
  }
  remover(productId:number): Observable<any>{
    return this.http.delete("http://localhost:3004/product/"+productId);
  }
}
