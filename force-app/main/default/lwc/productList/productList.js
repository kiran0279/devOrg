import { LightningElement, api,wire,track } from "lwc";
import getProducts from '@salesforce/apex/productListController.getProductList';

export default class ProductsList extends LightningElement {
	@api products = [];
    @wire (getProducts) wiredproducts({data,error}){
        if (data) {
            this.products = data;
            console.log('data : ===========>',data); 
        } else if (error) {
        console.log(error);
        }
   }
}