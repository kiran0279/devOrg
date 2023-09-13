/**
 * @description       : 
 * @author            : Saikiran Chintakayala
 * @group             : 
 * @last modified on  : 05-26-2022
 * @last modified by  : Saikiran Chintakayala
**/
trigger ContactTrigger on Contact (After Update , before Update , after Insert) {
    ContactHandler handler = new ContactHandler(); 
    if (Trigger.isInsert) {
         if (Trigger.isBefore) {
            handler.preventDuplicate(trigger.new);
        } 
     }        
    //  set<id> conId = new set<id>();
    //  for(Contact con: Trigger.new){
    //      if(con.Lastname!=NULL){ 
    //          conId.add(con.Id); 
    //      }
    //  }
    //  if(conId.size()>0)
    //   {
    //     CalloutToPostContact.post(conId);
    //   }  
        
        //  if(Trigger.isAfter && Trigger.isUpdate)
        // {
        //     ContactHandler.updatePhone(Trigger.New);
        // }     
        // ContactHandler.countOfContactacts();
        // for( Id contactId : Trigger.newMap.keySet() )
        // {
        //     if( Trigger.oldMap.get( contactId ).AccountId != Trigger.newMap.get( contactId ).AccountId )
        //     {
        //         ContactHandler.createAfflie(Trigger.New);
        //     }
        // }

       // if(Trigger.isAfter && Trigger.isUpdate)
       // {
       //     AccountHandler.countOfContactacts(Trigger.new);
       // }
}