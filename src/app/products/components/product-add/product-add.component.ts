import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ProductState } from "../../store/product.reducer";
import { addProduct } from "../../store/product.actions";

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.scss"]
})
export class ProductAddComponent implements OnInit {
  constructor(private productService: ProductService,private store:Store<ProductState>) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    // const productObserver = {
    //   next: () => (
    //     this.router.navigate(["/product/list"]), console.log("success")
    //   ),
    //   error: (err: any) => console.error(err)
    // };

    // this.productService.createProduct(f.value).subscribe(productObserver);
    this.store.dispatch(addProduct({product:f.value }))
  }
}
