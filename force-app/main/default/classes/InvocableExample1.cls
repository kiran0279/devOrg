public with sharing class InvocableExample1 {
    @InvocableMethod
    public static void CreateOpportunities(List<List<Account>> accList)
    {
        Map<Id, Account> accountMap = new Map<Id, Account>([SELECT Id, Name FROM Account WHERE Id IN: accList[0]]);       
        List<Opportunity> oppList = new List<Opportunity>();
        for(Account acc : [SELECT Id, Name FROM Account WHERE Id IN: accountMap.keySet()]) 
        {
            Opportunity opp = new Opportunity();
            opp.AccountId = acc.Id;
            opp.Name = acc.Name;
            opp.CloseDate = Date.today();
            opp.StageName = 'Prospecting'; 
            oppList.add(opp);
        }
        insert oppList;
    }
}