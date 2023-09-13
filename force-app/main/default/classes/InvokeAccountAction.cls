public with sharing class InvokeAccountAction {
    @InvocableMethod(label='Get Account Names')    
   public static void getAccountIds(List<List<Account>> names) {
      List<Account> accounts = new List<Account>();
       Integer i = 10;
      for (Account account : names[0]) {
          i++;
          account.Phone = '98765643'+i;
          account.AccountNumber = '453565'+i;
          account.AnnualRevenue = 350000*i;
          account.Total_Amount__c = account.AnnualRevenue - (12/100);
          account.Type = 'Prospect';
         accounts.add(account);
          
      }
       System.debug('gsvys'+accounts);
      update accounts;
   }
}