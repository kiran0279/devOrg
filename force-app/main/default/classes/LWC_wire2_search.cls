public with sharing class LWC_wire2_search 
{
   @AuraEnabled(cacheable = true)
   public static List<Contact> findcon(String search)
   {
      String key = '%'+search+'%';
      Return  [SELECT Id, LastName, Phone, Email 
                FROM Contact 
                WHERE LastName like : key];
   }
}