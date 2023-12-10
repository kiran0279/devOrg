public with sharing class JsonParserExample { 
    public static  List<String> places{set;get;}
    public static String pincode {set;get;}
    public static  void createAcc(List<Account> accList)
    { 
        List<Integer> postalcodes = new List<Integer>();

        for(Account acc : accList)
        {
            Integer postCode = integer.valueof(acc.BillingPostalCode);
            postalcodes.add(postCode);
        }
        Integer postalCode = postalcodes[0];
        places = New List<String>();
       String e = 'https://api.postalpincode.in/pincode/';
        String n = String.valueOf(postalCode);
        String en = e+n;
       Http p = New Http();   
       HttpRequest request = New HttpRequest();
       request.setEndpoint(en);
       request.setMethod('GET');
       HttpResponse response = p.send(request);
       String body = response.getBody();
       System.JsonParser jp = JSON.createParser(body);
       While(jp.nexttoken() != null )
       {
           if(jp.getText() == 'Name')
           {
               jp.nextToken();
               places.add(jp.gettext());
           }
       }
       System.debug('Places : '+places);
       for(Account acc : accList)
       {
          acc.BillingCity = places[0];
       }
    }
}