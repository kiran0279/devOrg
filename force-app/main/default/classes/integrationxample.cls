public class integrationxample {
    public List<String> places{set;get;}
        public String pincode {set;get;}
    public void postalcodes(Integer postalCode )
    {
        places = new List<String>();
        String url = 'https://api.postalpincode.in/pincode/';
        String pin = String.valueOf(postalCode);
        String en = url+pin;
        Http p = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(en);
        request.setMethod('GET');
        HttpResponse response = p.send(request);
        String body = response.getBody();
        System.JsonParser jp = Json.createParser(body);
        while(jp.nexttoken() != null)
        {
            if(jp.getText() == 'Name')
            {
                jp.nextToken();
                places.add(jp.gettext());
            }
        }
        System.debug('Places :'+places);
    }

}