import { renderHook, act, waitFor } from '@testing-library/react-native';
import { it, describe, expect } from '@jest/globals';
import { useFinancialProducts } from '../../../../src/modules/financial_products/aplication/useFinantialProducts';
import { FinancialProductsRepository } from '../../../../src/modules/financial_products/domain/repositories/financialProductsRepository';
import { FinancialProduct } from '../../../../src/modules/financial_products/domain/entities/financialProduct';
import { FinancialProductsByQueryRequest } from '../../../../src/modules/financial_products/domain/requests/finantialProductsByQueyRequest';
import { financialProducts } from '../../../../src/modules/financial_products/infraestructure/datasources/local/db';

class successMockProductsRepositoryImpl implements FinancialProductsRepository {
    async getAll(): Promise<FinancialProduct[]> {
        return financialProducts;
    }
    async getBy(props: FinancialProductsByQueryRequest): Promise<FinancialProduct[]> {
        return [financialProducts[0]];
    }

    add(): Promise<FinancialProduct> {
        throw new Error('Method not implemented.');
    }
    update(): Promise<FinancialProduct> {
        throw new Error('Method not implemented.');
    }
    delete(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
class errorMockProductsRepositoryImpl implements FinancialProductsRepository {
    getAll(): Promise<FinancialProduct[]> {
        throw new Error('Method not implemented.');
    }
    getBy(props: FinancialProductsByQueryRequest): Promise<FinancialProduct[]> {
        throw new Error('Method not implemented.');
    }
    add(): Promise<FinancialProduct> {
        throw new Error('Method not implemented.');
    }
    update(): Promise<FinancialProduct> {
        throw new Error('Method not implemented.');
    }
    delete(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

describe('useFinancialProducts', () => {
    it('debe inicializar el estado correctamente', () => {
        const successMockProductsRepository = new successMockProductsRepositoryImpl();
        const { result } = renderHook(() => useFinancialProducts({ producstRepository: successMockProductsRepository, autoLoadProducts: false }));

        expect(result.current.state.products).toEqual([]);
        expect(result.current.state.query).toEqual('');
        expect(result.current.state.productStatus.status).toEqual('initial');
    });

    it('debe actualizar el estado cuando se llama a getProducts', async () => {
        const successMockProductsRepository = new successMockProductsRepositoryImpl();
        const { result } = renderHook(() => useFinancialProducts({ producstRepository: successMockProductsRepository, autoLoadProducts: false }));

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
        const { result } = renderHook(() => useFinancialProducts({ producstRepository: errorMockProductsRepository, autoLoadProducts: false }));

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
        const { result } = renderHook(() => useFinancialProducts({ producstRepository: successMockProductsRepository, autoLoadProducts: false }));

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
