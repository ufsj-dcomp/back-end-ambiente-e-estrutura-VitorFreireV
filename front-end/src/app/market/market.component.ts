import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../product.service';

export class Product{
  id:number;
  type_prod:string;
  city:string;
  state:string;
  value:number;
};

const PRODUCT : Product[] = [
  {id:1, type_prod: 'cacto', city: "São João del-Rei", state: "Venda", value:123.4},
  {id:2, type_prod: 'flower', city: "São João del-Rei", state: "Troca", value:10.99}
];

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})

export class MarketComponent implements OnInit {

  displayedColumns: string [] = ['id', 'type_prod','state', 'value', 'city', 'acoes'];

  dataSource = new MatTableDataSource<Product>();//PRODUCT;


  constructor(private services: ProductService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.services.getProducts().subscribe(products => this.dataSource.data = products);
  }


  openNewDialog(): void{
    const dialogRef = this.dialog.open(MngProductDialog,{
      width: "750px",
      data : new Product()
    });

    dialogRef.afterClosed().subscribe(product => {
      console.log(product)
      this.services.adicionar(product).subscribe(productId =>{
        this.services.getProduct(productId).subscribe(newProduct =>{
          this.dataSource.data = this.dataSource.data.concat(newProduct);
        });
      });
    })
  }
  openEditDialog(product: Product): void{
    const dialogRef = this.dialog.open(MngProductDialog,{
      width: "750px",
      data : product
    });

    dialogRef.afterClosed().subscribe(product => {
      console.log(product)
      this.services.editar(product).subscribe(_ =>{
        this.dataSource.data = this.dataSource.data.map(oldProduct => {
          if (oldProduct.id == product.id) return product;
        });
        
      });
    });
  }

  excluir(product: Product):void{
    this.services.remover(product.id).subscribe(_ =>{
      this.dataSource.data = this.dataSource.data.filter(oldProduct => oldProduct.id != product.id);
    });
  }


}

@Component({
  selector: "dialog-mng-product",
  templateUrl : "dialog-mng-product.html"
})

export class MngProductDialog{

  constructor(public dialogRef: MatDialogRef <MngProductDialog>,
       @Inject(MAT_DIALOG_DATA) public data: Product ){}
  
  onNoClick(): void{
    this.dialogRef.close();
  }
}