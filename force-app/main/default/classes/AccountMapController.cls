public with sharing class AccountMapController {
    //Get Current user details
    @AuraEnabled(cacheable=true)
    public static User getCurrentUser(String userId) {
      return [
        SELECT Id, Name, Street, City, State, PostalCode, Country
        FROM User
        WHERE Id = :userId
        WITH SECURITY_ENFORCED
      ];
    }
  }