@isTest 
public with sharing class TestForContactTrigger {
    public static testMethod void testInsert()
    {
        String adderror = 'existing';
        Contact con = new Contact(LastName = 'Test', FirstName = 'Trigger', Phone = '66543757');
        List<Contact> conlist =[SELECT Id, FirstName, LastName, Phone FROM Contact];
        Test.startTest();
        // Insert Contact
        if(conlist.size() < 1)
        {
         Insert con;
        }
        Test.stopTest();
        System.assertEquals('Test',con.LastName);
    }
}