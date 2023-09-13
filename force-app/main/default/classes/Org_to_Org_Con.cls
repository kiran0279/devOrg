@RestResource(urlMapping='/getLeadInfo/*')
global class Org_to_Org_Con {

    @HttpGet
    global static Lead getLead()
    {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        string urlid = req.requestURI.subString(req.requestURI.lastIndexOf('/')+1);
        Lead ld = [SELECT ID,Name FROM Lead WHERE Id =: urlid];
        System.debug('uygygu : '+ld);
        return ld;
    }
}