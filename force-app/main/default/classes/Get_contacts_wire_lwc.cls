public with sharing class Get_contacts_wire_lwc 
{
    @AuraEnabled(cacheable=true)
    public static List<Contact> getConList() 
    {
       return [SELECT Id, FirstName, LastName, Phone, Email 
                FROM Contact limit 10];
    }
}