import React, { ReactNode, createContext, useContext } from 'react'
import { FinancialProductsHook, financialProductsHook, useFinancialProducts } from '../../application/useFinantialProducts';
import { RepositoryContext } from '../../../common/components/RepositoryProvider';


export const FinanctialProductsContext = createContext<FinancialProductsHook>(financialProductsHook);
export const FinancialProductsProvider = ({ children }: { children: ReactNode }) => {
    const { productRepository } = useContext(RepositoryContext);
    const finalProductsReducer = useFinancialProducts({ productRepository });
    return (
        <FinanctialProductsContext.Provider value={finalProductsReducer}>
            {children}
        </FinanctialProductsContext.Provider>
    )
}
