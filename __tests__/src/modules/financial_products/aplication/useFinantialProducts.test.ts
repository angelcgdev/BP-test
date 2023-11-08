import { renderHook, act, waitFor } from '@testing-library/react-native';
import { it, describe, expect } from '@jest/globals';
import { useFinancialProducts } from '../../../../../src/modules/financial_products/application/useFinantialProducts';
import { financialProducts } from '../../../../../src/modules/financial_products/infraestructure/datasources/local/db';
import { errorMockProductsRepositoryImpl } from '../../../../../src/modules/financial_products/infraestructure/repositories/errorMockProductsRepositoryImp';
import { successMockProductsRepositoryImpl } from '../../../../../src/modules/financial_products/infraestructure/repositories/successMockProductsRepositoryImpl';

describe('useFinancialProducts', () => {
    it('debe inicializar el estado correctamente', () => {
        const successMockProductsRepository = new successMockProductsRepositoryImpl();
        const { result } = renderHook(() => useFinancialProducts({ productRepository: successMockProductsRepository, autoLoadProducts: false }));

        expect(result.current.state.products).toEqual([]);
        expect(result.current.state.query).toEqual('');
        expect(result.current.state.productStatus.status).toEqual('initial');
    });

    it('debe actualizar el estado cuando se llama a getProducts', async () => {
        const successMockProductsRepository = new successMockProductsRepositoryImpl();
        const { result } = renderHook(() => useFinancialProducts({ productRepository: successMockProductsRepository, autoLoadProducts: false }));

        act(() => {
            result.current.actions.getProducts();
        });

        await waitFor(() => {
            expect(result.current.state.productStatus.status).toEqual('successfully');
            expect(result.current.state.products).toHaveLength(financialProducts.length);
        });
    });

    it('debe manejar errores en getProducts', async () => {
        const errorMockProductsRepository = new errorMockProductsRepositoryImpl();
        const { result } = renderHook(() => useFinancialProducts({ productRepository: errorMockProductsRepository, autoLoadProducts: false }));

        act(() => {
            result.current.actions.getProducts();
        });
        await waitFor(() => {
            expect(result.current.state.productStatus.status).toEqual('failure');
            expect(result.current.state.productStatus.error).toEqual('Error desconocido.');
        })

    });


    it('debe actualizar el estado cuando se llama a search', async () => {
        const successMockProductsRepository = new successMockProductsRepositoryImpl();
        const { result } = renderHook(() => useFinancialProducts({ productRepository: successMockProductsRepository, autoLoadProducts: false }));

        act(() => {
            result.current.actions.search('credito');
        });

        await waitFor(() => {
            const searchResultLength = 1;
            expect(result.current.state.productStatus.status).toEqual('successfully');
            expect(result.current.state.products).toHaveLength(searchResultLength);
        });
    });
});
