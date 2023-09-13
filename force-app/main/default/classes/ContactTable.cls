public with sharing class ContactTable {
    @AuraEnabled(Cacheable = false)
    public static List<Contact> getContacts(){
        List<Contact> contactFields= [SELECT Id,LastName,FirstName,Email,Phone
                FROM Contact ]; 
                return contactFields;       
    }
    @AuraEnabled
        public static void EditedCon(List<Contact> contList){
            List<Contact> contactFields = contList;
            upsert contactFields;
        }
}