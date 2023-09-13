public with sharing class productListController {
    @AuraEnabled(cacheable=true)
    public static List<Product_List__c> getProductList() {
        List<Product_List__c> productList = [SELECT Id, Name, Image_Url__c, Number_of_Products__c, Price_Of_The_Product__c, Total_Price__c	 FROM Product_List__c];
        System.debug(productList);
        return productList;
    }
}