public with sharing class Search_acc_select_mul_class {
   @AuraEnabled (cacheable = true)
   public static List<Account> searchAccount (String searchAcc)
   {
       String key = '%'+searchAcc+'%';
       return [SELECT Id, Name 
                FROM Account
                WHERE Name Like:key];
   }
  
}