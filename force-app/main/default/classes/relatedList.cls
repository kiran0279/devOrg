public with sharing class relatedList {
    public static void  relatedListMap(Id accId ) 
    {
        Account ac = [Select Id,Name From Account Where Id =: accId];
        System.debug('ac '+ac);
        map<Id, list<Contact>> mapAccAndCons = new map<Id, list<Contact>>();
        System.debug('mapAccAndCons => '+mapAccAndCons);
        list<Contact> lstCons = [Select Id,AccountId, Name, Account.Name from Contact];
        System.debug('lstCons => '+lstCons);
        for(Contact conIterator : lstCons) {
            if (!mapAccAndCons.containsKey(accId) ) {
                mapAccAndCons.put(accId, new List<Contact>());
                System.debug('lstCons => '+mapAccAndCons);
              }
              if(conIterator.AccountId ==accId){
                 mapAccAndCons.get(accId).add(conIterator);
                 System.debug('lstCons => else'+mapAccAndCons);
              }

        }
        
        System.debug('mapAccAndCons => '+mapAccAndCons);
        System.debug('mapAccAndCons size ====>'+mapAccAndCons.get(accId).size());
    }
}