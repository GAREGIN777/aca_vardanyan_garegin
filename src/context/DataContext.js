// DataContext.js
import React, {createContext, useState, useEffect, useContext} from 'react';
import {ProductsModel} from "../dbModels/ProductsModel";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const [invoiceLinesRes,invoicesRes, productsRes, usersRes] = await Promise.all([
                        fetch("https://bever-aca-assignment.azurewebsites.net/invoicelines"),
                        fetch('https://bever-aca-assignment.azurewebsites.net/invoices'),
                        fetch('https://bever-aca-assignment.azurewebsites.net/products'),
                        fetch('https://bever-aca-assignment.azurewebsites.net/users')
                    ]);

                    const [invoiceLines,invoices, products, users] = await Promise.all([
                        invoiceLinesRes.json().then(res => res.value),
                        invoicesRes.json().then(res => res.value),
                        productsRes.json().then(res => new ProductsModel(res.value)),
                        usersRes.json().then(res => res.value)
                    ]);

                    const combinedData = { invoiceLines,invoices, products, users };
                    setData(combinedData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoaded(true);
                }
            };

            fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ data, loaded }}>
            {children}
        </DataContext.Provider>
    );
};

export const useAcaAPI = () => useContext(DataContext);

