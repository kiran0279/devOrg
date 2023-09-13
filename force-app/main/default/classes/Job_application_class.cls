public with sharing class Job_application_class {
  @AuraEnabled (cacheable=true)
  public static void getapplications()
  {
      List<Job_Application__c> listapp = [SELECT Id,Address__c 
                                            FROM Job_Application__c ];
  }
}