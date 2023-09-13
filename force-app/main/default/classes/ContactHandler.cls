public  class ContactHandler {
    public void preventDuplicate( List<Contact> newContacts)
    {
        //Set to store LastNames
        set <String> lastnameSet = new Set<String>();
        set <String> lastnameSet1 = new Set<String>(); 
        // Set to store email ids
        Set <String> emailSet = new Set<String>(); 
        Set <String> emailSet1 = new Set<String>(); 
        // Set to store phone numbers
        Set <String> phoneSet = new Set<String>();
        Set <String> phoneSet1 = new Set<String>();

         // Iterate through each Contact and add their LastName, email and phone number to their respective Sets
        for(Contact con : newContacts)
        {
            lastnameSet.add(con.LastName);
            emailSet.add(con.Email);
            phoneSet.add(con.Phone);
        }
         // Populating the list using SOQL
         List<Contact> esistingContacts = [SELECT LastName, Email ,Phone 
                                            FROM Contact 
                                            WHERE (LastName IN:lastnameSet  AND LastName != Null) OR (Email IN :emailSet AND Email!= Null) OR (Phone IN :phoneSet  AND Phone != Null)];
        for(Contact con : esistingContacts) 
        {
            lastnameSet1.add(con.LastName);
            emailSet1.add(con.Email);
            phoneSet1.add(con.Phone);
            
        }
        // Checking If the email or Phone or Lastname Contains Same in records in Object
        for(Contact con : newContacts)
        {
            if(lastnameSet1.contains(con.LastName) || emailSet1.contains(con.Email) || phoneSet1.contains(con.Phone))
            {
                // Error message
                con.AddError('Duplicate record is not allowed');
            }
            // If not same then it will saved
            else
                 {
                lastnameSet1.add(con.LastName);
                emailSet1.add(con.Email);
                phoneSet1.add(con.Phone);
                }
        }
    }
//     public static Boolean isFirstTime = true;
//    public static void updatePhone(List<Contact> conList){
//         integer i = 10;
//         if( isFirstTime == true)
//         {
//             isFirstTime = false;
//             List<Contact> conLst = new List<Contact>();
//             for(Contact con :[SELECT Id, Phone From Contact])
//             {
//                 con.Phone = '84787684'+i++;
//                 conLst.add(con);
//             }
//             Update conLst;
//         }
//    }
   public static void countOfContactacts()
   {
       List<Contact> conList =[SELECT Id, AccountId FROM Contact];
    set<id>accid=new set<id>();
        for(contact con : conList) 
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
//     public static void createAfflie(List<Contact> conList)
//     {
//        set<Id> accId = New set<Id>();
//        List<Contact> contactList = ([Select Id, AccountId From Contact]);
//     //    for(Contact conObj : conList)
//     //    {
//     //         accId.add(conObj.AccountId);
//     //    }
//        map<Id, List<Contact>> mapacIdwithContacts = new map<Id, List<Contact>>();
//        for(Contact cont: contactList)
//         {
//             if(mapacIdwithContacts.get(cont.AccountId) == NULL)
//                 {
//                     mapacIdwithContacts.put(cont.AccountId,new List<Contact>());
//                 }
//                 mapacIdwithContacts.get(cont.AccountId).add(cont);
//         }
//         system.debug('---mapidVsContact--->'+mapacIdwithContacts);


//     }

}