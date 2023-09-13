/**
    * Trigger to handle operations on Account object
    * ===============================================================
    * Version | Date | Author 
    * -------------------------------------------------------------------
    * 1.0 | 22/12/2020 | sujata.chaudhari@weare4c.co
    */
    trigger AccountTrigger on Account(before insert, after insert, after update, after delete, before Update, before Delete){
        // if(Trigger.isBefore && Trigger.isUpdate){
        //     AccountTriggerHandler.afterInsert(Trigger.new, Trigger.newMap);
        // }
        // if(Trigger.isBefore && Trigger.isUpdate){
        //     AccountTriggerHandler.beforeUpdate(Trigger.old, Trigger.newMap);
        // }
        
        // if(Trigger.isBefore && Trigger.isInsert){
        //     AccountTriggerHandler.beforeInsert(Trigger.new, Trigger.newMap);
        // }
        // if(Trigger.isAfter && Trigger.isInsert){
        //     AccountHandler.insertAccount(Trigger.new);
        // }
        // if(Trigger.isAfter && Trigger.isDelete)
        // {
        //     AccountHandler.deleteContacts(Trigger.new);
        // }
        // else if(Trigger.isBefore && Trigger.isdelete){
        //     AccountTriggerHandler.beforeDelete(Trigger.old, Trigger.oldMap);
        // }
        // else if(Trigger.isAfter && Trigger.isUpdate){
        //     AccountTriggerHandler.afterUpdate(Trigger.new, Trigger.oldMap);
        // }  
        // else if(Trigger.isAfter && Trigger.isdelete){
        //     AccountTriggerHandler.afterDelete(Trigger.old, Trigger.oldMap);
        // }
     //   if(Trigger.isAfter && Trigger.isUpdate)
      //  {
       //     AccountHandler.countOfContactacts(Trigger.new);
       // }
        // if(Trigger.isAfter && Trigger.isUpdate)
        // {
        //     AccountHandler.createAfflie(Trigger.New);
        // }
    }