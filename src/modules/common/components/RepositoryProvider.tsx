import React, { ReactNode, createContext } from 'react'
import { FinancialProductsRepositoryImpl } from '../../financial_products/infraestructure/repositories/financialProductsRepositoryImpl';

const providers = { productRepository: new FinancialProductsRepositoryImpl() }
export const RepositoryContext = createContext(providers);
export const RepositoryProvider = ({ children }: { children: ReactNode }) => {
    return (
        <RepositoryContext.Provider value={providers}>
            {children}
        </RepositoryContext.Provider>
    )
}
