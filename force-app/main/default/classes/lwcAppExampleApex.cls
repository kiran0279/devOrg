public with sharing class lwcAppExampleApex {

    @AuraEnabled(cacheable=true)
    public static List<Contact> retrieveContactData(string keySearch){       
        
        List<Contact> contactList = [Select Id, FirstName, LastName, Email, Phone From Contact Where LastName=:keySearch];
        return contactList;
    }
}