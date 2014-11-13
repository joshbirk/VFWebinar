@IsTest
public class VSControllerTest {

    @istest
    public static void testController() {
        VSController vs = new VSController();
        
        Contact c = new Contact(LastName='TEST',MobilePhone='5555555555');
        insert c;
        vs.contactId = c.Id;
        vs.mphone = c.MobilePhone;
        vs.updateParams();
        vs.updatePhone();
        
		VSController.updatePhone(c.Id, c.MobilePhone);
    }
    
}