import NavbarLogged from "../../menu/Navbar/NavbarLogged";
import {useAuth} from "../../../context/AuthContext";
import {useAcaAPI} from "../../../context/DataContext";
import {useEffect, useState} from "react";
import Invoice from "../../styled/Invoice/Invoice";

export default function HomeLogged() {

    let {user} = useAuth();
    let uId = user.getUserId();
    let {data} = useAcaAPI();

    let [invoices,setInvoices] = useState([]);


    useEffect(() => {
        if(uId){
            let startInvoices = [...data.invoices];
            startInvoices = startInvoices.filter(inv => inv.UserId === uId);

            startInvoices = startInvoices.map((inv) => {
                let relatedInvoiceLines = data.invoiceLines.filter(line => line.InvoiceId === inv.InvoiceId);
                relatedInvoiceLines = relatedInvoiceLines.map((line) => {
                    let {ProductId,...restLineProps} = line;
                    let fetchedProduct = data.products.find(product => product.ProductId === ProductId);
                    return {...restLineProps,Product:fetchedProduct}
                })
                return {...inv,InvoiceLines: relatedInvoiceLines};
            });

            console.log("Invoices: ",startInvoices);
            setInvoices(startInvoices)

        }
    },[])



    return (
        <>
            <NavbarLogged/>
        <div className="container">
            <h1>Գլխավոր</h1>
            <div className="mt-4">
                {invoices ? invoices.map(inv => <Invoice key={inv.InvoiceId} invoice={inv}></Invoice>): null }
            </div>
        </div>
        </>
    );
}