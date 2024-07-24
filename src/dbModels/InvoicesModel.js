class InvoicesModel {
    static findByUserId(userId,invoices){
        if((!invoices || !Array.isArray(invoices)) || !userId) {
           return null;
        }
        let foundInvoices = invoices.filter((invoice) => invoice.UserId === userId);
        return new InvoicesModel(invoices);
    }

    constructor(invoices) {
        if(!invoices || !Array.isArray(invoices)) {
            return null;
        }
        else{
            /*Invoices model*/
        }
    }
}

function InvoiceModel(){

}