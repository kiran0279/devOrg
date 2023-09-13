public class LeadRecordsDelete {
    @InvocableMethod
    public static void getleads(List<List<Lead>> leadList)
    {
        List<Lead> leadLst = New List<Lead>();
        for(Lead lead : leadList[0])
        {
            leadLst.add(lead);
        }
        delete leadLst;
    }
}