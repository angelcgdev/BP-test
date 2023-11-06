import React, { ReactNode, createContext } from 'react'
import { FinancialProductsHook, financialProductsHook, useFinancialProducts } from '../../aplication/useFinantialProducts';
import { FinancialProductsRepositoryImpl } from '../../infraestructure/repositories/financialProductsRepositoryImpl';


export const FinanctialProductsContext = createContext<FinancialProductsHook>(financialProductsHook);
export const FinancialProductsProvider = ({ children }: { children: ReactNode }) => {
    const finalProductsReducer = useFinancialProducts({
        producstRepository: new FinancialProductsRepositoryImpl(),
    });
    return (
        <FinanctialProductsContext.Provider value={finalProductsReducer}>
            {children}
        </FinanctialProductsContext.Provider>
    )
}
