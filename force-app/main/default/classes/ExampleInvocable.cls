public class ExampleInvocable {
    @InvocableMethod(label='Get Contact Names') 
    public static void getContacts(List<Contact> contactName)
    {
        List<Contact> con = new List<Contact>();
        for(Contact c : contactName)
        {
            c.LastName = 'FlowApex';
            con.add(c);
        }
        update con;
    }

}