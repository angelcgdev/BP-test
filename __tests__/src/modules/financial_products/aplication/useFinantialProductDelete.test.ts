import { renderHook, act, waitFor } from '@testing-library/react-native';
import { it, describe, expect } from '@jest/globals';
import { useFinantialProductDelete } from '../../../../../src/modules/financial_products/application/useFinantialProductDelete';
import { errorMockProductsRepositoryImpl } from '../../../../../src/modules/financial_products/infraestructure/repositories/errorMockProductsRepositoryImp';
import { financialProducts } from '../../../../../src/modules/financial_products/infraestructure/datasources/local/db';
import { successMockProductsRepositoryImpl } from '../../../../../src/modules/financial_products/infraestructure/repositories/successMockProductsRepositoryImpl';

describe('useFinancialProducts', () => {

    it('debe actualizar el estado cuando se llama a deleteProduct', async () => {
        const successMockProductsRepository = new successMockProductsRepositoryImpl();
        const product = financialProducts[0];
        const { result } = renderHook(() => useFinantialProductDelete({ productRepository: successMockProductsRepository, product }));

        act(() => {
            result.current.actions.deleteProduct();
        });
        await waitFor(() => {
            expect(result.current.state.deleteStatus).toEqual('successfully');
        })
    });

    it('debe manejar errores en deleteProduct', async () => {
        const errorMockProductsRepository = new errorMockProductsRepositoryImpl();
        const product = financialProducts[0];
        const { result } = renderHook(() => useFinantialProductDelete({ productRepository: errorMockProductsRepository, product }));

        act(() => {
            result.current.actions.deleteProduct();
        });
        await waitFor(() => {
            expect(result.current.state.deleteStatus).toEqual('failure');
        })
    });

})