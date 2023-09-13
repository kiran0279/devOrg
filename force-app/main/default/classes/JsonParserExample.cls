public with sharing class JsonParserExample { 
    public  List<String> places{set;get;}
    public  String pincode {set;get;}
    public  void createAcc(Integer postalCode) 
    { 
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
    }
}