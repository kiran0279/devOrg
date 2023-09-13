public with sharing class SendSmsIntegration {
    @future(callout = true)
    public static void sendMessage(Set<Id> leadids) 
    {
        List<Lead> leads = [SELECT Id, Phone1__c, Name
                                FROM Lead 
                                WHERE Id In: leadids];
        for(Lead ld : leads)
        {
            Http p= New Http();
            HttpRequest request = New HttpRequest();
            String endpoint = 'https://api.textlocal.in/send/?';
            endpoint = endpoint + 'apikey=NzU3ODdhNzczNjY5NjM0ZDZmMzA1YTM5Njc0ZjY2NTg=';
            endpoint = endpoint + '&numbers='+'91'+ld.Phone1__c;
            endpoint = endpoint + '&sender=TXTLCL';
            endpoint = endpoint + '&message=Hi_Welcome_to_salesforce_org_From_CSK';
            request.setEndpoint(endpoint);
            request.setMethod('GET');
            HttpResponse response = p.send(request); 
        }
    }
}