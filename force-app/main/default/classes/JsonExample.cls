public with sharing class JsonExample {
    public void CreateJson(String nm , String ph, String fx)
    {
        System.JSONGenerator js = JSON.CreateGenerator(true); //Step-1 - Create JSON Generator
        js.writeStartObject();                                //Step-2 - Start Writing to JSON
        try {
            Account a = new Account();
            a.Name = nm;
            a.Phone = ph;
            a.Fax = fx;                                     
            insert a;                                           //Write what ever you need

            js.WriteStringField('Status','Success');
            js.writeIdField('AccId',a.Id);
            js.writeStringField('Msg','Account Created Suucessfully');
            js.writeNumberField('Code',100);
        } catch (Exception e) {
            js.WriteStringField('Status','Failed');
            js.writeIdField('AccId',e.getmessage());
            js.writeStringField('Msg','Account Failed to create');
            js.writeNumberField('Code',200);
        }                                              
        js.writeEndObject();                                   //Step-3 - End writing to JSON
        String Result = js.getAsString();                      //Step-4 - Get the final output JSON
        System.debug(Result);                                  //Step-5 - See/check the Output
    }
    public static void BringData()
    {
        System.JSONGenerator js = JSON.CreateGenerator(true); 
        js.writeStartObject();   
        try
        {
            List<Account>  acList = [SELECT Id, Name, Phone 
                                    FROM Account];
                for(Account ac : acList)
                {
                    js.WriteStringField('Account Name',ac.Name);
                    js.writeIdField('AccId',ac.Id);
                    js.writeStringField('Status','Success');
                    js.writeNumberField('Code',300);
                }
        }
        catch(Exception e)
        {
                    js.writeStringField('Status','Failes');
                    js.writeNumberField('Code',304);
        }
        js.writeEndObject();                                   
        String op = js.getAsString();                     
        System.debug(op);
    }
}