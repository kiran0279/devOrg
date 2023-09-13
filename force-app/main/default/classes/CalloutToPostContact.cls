public with sharing class CalloutToPostContact {
    @future(callout = true)
    public static void post(set<id> conIdSet) 
    { 
        for (List<Contact> con: [SELECT FirstName, LastName, Phone from contact where id IN: conIdSet])
         {
        system.debug('JSON' + JSON.serialize(con));
       Http h1 = new Http();
       HttpRequest req1 = new HttpRequest();
       req1.setHeader('Content-Type', 'application/json;charset=UTF-8');
       req1.setMethod('POST');
       req1.setBody(JSON.serialize(con));
       req1.setEndpoint('callout:Test_Credintials/services/apexrest/Contact');
       HttpResponse hresp1 = h1.send(req1);
       system.debug('hresp1' + hresp1);
         }
    }

}