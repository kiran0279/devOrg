public class GetAccountUsingRESTAPI {
     public static void getAccount(){
        HttpRequest req=new HttpRequest();
        req.setEndpoint('https://login.salesforce.com/services/oauth2/token');
        req.setMethod('POST');
        String CLIENT_ID = '3MVG9pRzvMkjMb6mexNrxKGAVuMHAhQoPs_E6giR9dOJ1ZgdwZUFhIUkOnKNTZiPy1LjsewycQllvRz9H8.PK';
        String CLIENT_SECRET = '181C62B0C3D13059B9A962436A169F25FD2E6C49E9197521BDAD390E3586B454';
        String USERNAME = 'saikiran.chintakayala@curious-badger-smx6o.com';
        String PASSWORD = 'Kiran#0217Jk3wZnYpc3UFabxqpuhYYpjr';
        
        req.setBody('grant_type=password' + '&client_id='+CLIENT_ID + 
                    '&client_secret='+CLIENT_SECRET + '&username='+USERNAME + '&password='+PASSWORD);
        Http http=new Http();
        HttpResponse res=new HttpResponse();
        res=http.send(req);
        System.debug('response-->: '+res.getBody());
        Oauth objAuthInfo=(Oauth)JSON.deserialize(res.getBody(), Oauth.class);
        if(objAuthInfo.access_token!=null){
            HttpRequest req1=new HttpRequest();
            req1.setEndpoint('https://curious-badger-smx6o-dev-ed.my.salesforce.com/services/apexrest/getAccounts/');
            req1.setMethod('GET');
            req1.setHeader('Authorization','Bearer '+objAuthInfo.access_token);
            Http http1=new Http();
            HttpResponse res1=new HttpResponse();
            res1=http1.send(req1);
            String ser = JSON.serializePretty(res1.getBody());
            System.debug('Date : '+ser);
            System.debug('Status -->: '+res1.getStatusCode());
            System.debug('Account Info-->: '+res1.getBody());
            //  Oauth1 obj1=(Oauth1)JSON.deserialize(res.getBody(), Oauth1.class);
           /* List<Account> obj1=(List<Account>)JSON.deserialize(res1.getBody(), List<Account>.class);
            insert obj1;
            System.debug('Account---->insert: : '+obj1); */
             System.JSONParser jp = JSON.CreateParser(res1.getBody());  
        	System.debug(jp);
        	While(jp.nextToken() != null)                      
        	{
           		if(jp.getText() == 'Account')
               	{
                   jp.nextToken();
                    System.debug('gdvhg' +jp.nextValue());
                  	/*List<Account> wr = (List<Account>) jp.readvalueas(List<Account>.class);
                  	System.debug('wr'+wr); */
               	}
           
        	} 
        }
     }
    public class Oauth{
        public String access_token{get;set;}
        public String instance_url{get;set;}
        public String id{get;set;}
        public String token_type{get;set;} 
        public String issued_at{get;set;}
        public String signature{get;set;}
    }  
}