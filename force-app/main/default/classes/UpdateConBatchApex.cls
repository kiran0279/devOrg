public class UpdateConBatchApex implements Database.Batchable<sObject> 
{
    public Database.QueryLocator start(Database.BatchableContext bc)
    {
        return Database.getQueryLocator([SELECT Id, LastName, Email, Phone, AccountId
                                         FROM Contact
                                        ]);
    }
    
    public void execute(Database.BatchableContext bc, List<Contact> conList)
    {
        List<Contact> conl = new List<Contact>();
        for(Contact con : conList)
        {
           if( (con.Email != Null) && (con.Email == 'worst@gmail.com'))
           {
           con.AccountId = '0015g00000Z05R1AAJ';
           }
        }
        update conl;
    }
    public void finish(Database.BatchableContext bc)
    {
        Messaging.SingleEmailMessage Em = new  Messaging.SingleEmailMessage();
        String[] toAddresses = new String[] {UserInfo.getUserEmail()};
        Em.setToAddresses(toAddresses);
        Em.setSubject('The Batch Is Executed successfully');
        Em.setPlainTextBody('The Records of Contact Object Is successully Updated');
        List<Messaging.Email> allEmail =  new List<Messaging.Email>{EM};
        Messaging.sendEmail(allEmail);
    }
}