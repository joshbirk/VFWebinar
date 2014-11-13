public class VSController {
	
    public List<Contact> all_contacts {get; set;}
    public Id contactId {get; set;}
    public String mphone {get; set;}
    
    public VSController() {
        all_contacts = [SELECT ID, Name, FirstName, LastName, MobilePhone, BirthDate, AssistantName, AssistantPhone, OtherPhone, ReportsToId, Title, Email, Description, HomePhone, Account.Name, Account.BillingStreet from CONTACT];
    }
    
    public PageReference updateParams() {
        return null;
    }
    
    public PageReference updatePhone() {
        Contact c = new Contact(Id=contactId,MobilePhone=mphone);
        update c;
        return null;
    }
    
    @RemoteAction
    public static Contact updatePhone(id contactId, string mphone) {
        Contact c = new Contact(Id=contactId,MobilePhone=mphone);
        update c;
        return c;
    }
       
}