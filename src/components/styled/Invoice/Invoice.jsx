import React, { useState } from 'react';
import styles from './Invoice.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import classNames from "classnames";

export default function Invoice({ invoice }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!invoice) {
        return null;
    }

    const { Name,PaidDate,InvoiceLines } = invoice;

    const jsPaidDate = new Date(PaidDate).toLocaleDateString();

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    let totalSum = 0;

    return (
        <div className="mt-4">
            <div className={styles.invoiceAccordion} onClick={toggleAccordion}>
                <div className={styles.invoiceAccordionDesc}>
                    <div className={styles.invoiceNameWrap}><span className={styles.invoiceName}>{Name}</span></div>
                    <div ><span className={styles.invoiceDate}>{jsPaidDate}</span></div>
                </div>
                <div>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>
            {isOpen && (
                <div className={styles.invoiceContent}>
                    <h2 className={styles.invoiceHeader}>{Name}</h2>

                    <table className={classNames("mt-4", styles.table)}>
                        <thead>
                        <tr className={styles.tr}>
                            <th>Անվանում</th>
                            <th>Քանակ</th>
                            <th>Գին</th>
                            <th>Գումար</th>
                        </tr>
                        </thead>
                        <tbody>
                        {InvoiceLines.map((invLine) => {
                            const {Quantity, Product} = invLine;
                            const {Name, Price} = Product;
                            let FormattedPrice = Price.toFixed(2);
                            let FormattedSubTotal = (Price * Quantity).toFixed(2)
                            totalSum += parseFloat(FormattedSubTotal);

                            return (
                                <tr key={invLine.InvoiceLineId}>
                                    <td>{Name}</td>
                                    <td>{Quantity}</td>
                                    <td>${FormattedPrice}</td>
                                    <td>${FormattedSubTotal}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                        <tfoot>
                        <tr style={{fontWeight:"900"}}>
                            <td colSpan="3" style={{textAlign: 'right'}}>Total:</td>
                            <td>${totalSum.toFixed(2)}</td>
                        </tr>
                        </tfoot>

                    </table>
                    {/* Add additional invoice details here */}
                </div>
            )}
        </div>
    );
}
