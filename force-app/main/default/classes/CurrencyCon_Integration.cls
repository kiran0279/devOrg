public with sharing class CurrencyCon_Integration implements Database.Batchable<Sobject>,Database.AllowsCallouts
{
    Public Database.QueryLocator start(Database.BatchableContext bc)
    {
        String query = 'SELECT Id, Amount, INR_Value__c FROM Opportunity';
        return Database.getQueryLocator(query);
    }
    Public Void execute(Database.BatchableContext bc , List<Opportunity> scope)
    {
        String url = 'http://apilayer.net/api/live?access_key=44c80ebbf0b57925c094ec1d23c0fed9&currency=INR&source=USD&format=1';
        Http p = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        HttpResponse res = p.send(req);
        String result = res.getBody();
        System.debug('Body : '+ res.getBody());
        System.debug('Result : '+ result);
        Decimal amt;
        System.JSONParser jp = JSON.createParser(result);
        While(jp.nextToken() != null)
        {
            if(jp.getText() == 'USDINR')
            {
                jp.nextToken();
                amt = (Decimal)jp.getDecimalValue();

            }
        }
        System.debug('Amount USD : '+amt);
        System.debug('opportunities : '+scope);
        for(Opportunity op: scope)
        {
            if(op.Amount != null)
            {
            op.INR_Value__c = 'RS.'+ (amt*op.Amount);
            System.debug('Value : '+op.INR_Value__c);
            }
        }
        update scope;
    }
    Public Void finish(Database.BatchableContext bc)
    {
        System.debug('hai successfully completed calloot');

    }
}