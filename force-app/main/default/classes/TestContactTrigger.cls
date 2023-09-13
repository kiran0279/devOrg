@isTest
public class TestContactTrigger {

    @isTest
    Public static void UpdateCount()
    {
        Account ac = new Account();
        ac.Name = 'sai';
        ac.Phone = '34455453443';
        insert ac;
        List<Contact> con =new List<Contact>();
        integer j = 3;
        for(integer i = 0; i < j; i++)
        {
            Contact c = new Contact();
            c.LastName = 'bbtgtg'+i;
            c.AccountId = ac.Id;
            con.add(c);
         }
        insert con;	
        Test.startTest();
        ContactHandler.countOfContactacts();
        ContactHandler ch = new ContactHandler();
        ch.preventDuplicate(con);
        Test.stopTest();
        System.assertEquals(3, j);
    }
}