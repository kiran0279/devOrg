public with sharing class AccountHandler {
    public static void insertAccount(List<Account> accList) {
        List<Contact> conLst = new List<Contact>();
        for(Account acc : accList)
        {
            conLst.add(new Contact (LastName = acc.Name , AccountId = acc.Id));
        }
        insert conLst;
    }
    public static void deleteContacts(List<Account> listAcc)
    {
        list<id> AccountIds=new list<id>(); 
        for(Account accountVar:listAcc)
        {
            AccountIds.add(accountVar.id);
        }  
        list<contact> listOfContacts=[select id from Contact where accountid in :AccountIds];
        system.debug('listOfContacts'+listOfContacts);
        delete listOfContacts;
    }
    public static void createAfflie(List<Account> accLst)
    {
        Map<Id, Account> accountMap = new Map<Id, Account>([SELECT Id, Name FROM Account WHERE Id IN: accLst]);       
        for(Account con : [SELECT Id, Name From Account WHERE Id IN: accountMap.keySet()])
        {
            Affliation__c af = new Affliation__c();
            af.Name = con.Name;
            af.AccountId__c = con.Id;
            af.Start_Date__c = Date.today();
            af.Status__c = 'Active';
            insert af;
        }

    }
    public static Boolean isFirstTime = true;
    public static void countOfContactacts(List<Contact> accs)
    {
        if( isFirstTime == true)
        {
            isFirstTime = false;
            set<id>accid=new set<id>();
            List<Contact> conList = ([Select Id, AccountId From Contact]);
            for(contact con:conList ) 
            {
                accid.add(con.accountid);
            }
            list<account> acclist= new list<account>([select id,name,Number_of_Contacts__c,(select id, name from contacts) from account where id IN:accid ]);
            for(account acc:acclist)
            {
                acc.Number_of_Contacts__c= acc.contacts.size();
            }
            update acclist;
        }
    }
}