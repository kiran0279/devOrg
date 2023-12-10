public with sharing class SearchController {
    @AuraEnabled(cacheable=true)
    public static List<Account> searchRecords(String searchTerm) { // Change Account to your object
        searchTerm = '%' + searchTerm + '%';
        return [SELECT Id, Name FROM Account WHERE Name LIKE :searchTerm ];
    }
}