public with sharing class ScheduleClassForApexClass implements Schedulable
{
    public void execute (SchedulableContext sche)
    {
       CurrencyCon_Integration b = new CurrencyCon_Integration(); 
        database.executebatch(b);
    }
  
}