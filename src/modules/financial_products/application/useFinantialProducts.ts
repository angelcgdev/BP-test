import { useCallback, useEffect, useMemo, useReducer } from "react";
import { FinancialProduct, financialProductEmpty } from "../domain/entities/financialProduct";
import { FinancialProductsRepository } from "../domain/repositories/financialProductsRepository";
import { debounce } from "../../../utils/debounce";
import { financialProductFormErrorsEmpty } from "../ui/models/financialProductFormErrors";

interface UpdateProductsAction {
    type: 'updatedProducts',
    payload: FinancialProduct[]
}
interface UpdateQueryAction {
    type: 'updateQuery',
    payload: string
}

interface ProductsStatusPayload {
    status: 'initial' | 'loading' | 'successfully' | 'failure',
    error?: string
}

interface ProductsStatusAction {
    type: 'updateProductsStatus',
    payload: ProductsStatusPayload,
}
interface SelectProductAction {
    type: 'selectProduct',
    payload: FinancialProduct,
}

type FinancialProductAction = UpdateProductsAction | UpdateQueryAction | ProductsStatusAction | SelectProductAction;

interface FinancialProductsState {
    products: FinancialProduct[],
    productSelected: FinancialProduct,
    query: string,
    productStatus: ProductsStatusPayload,
}

function reducer(state: FinancialProductsState, action: FinancialProductAction): FinancialProductsState {
    const { type, payload } = action;
    switch (type) {
        case 'updatedProducts':
            return { ...state, products: payload, productStatus: { status: 'successfully' } }
        case 'updateQuery':
            return { ...state, query: payload }
        case 'updateProductsStatus':
            return { ...state, productStatus: payload }
        case 'selectProduct':
            return { ...state, productSelected: payload }
    }
}
const initialState: FinancialProductsState = {
    products: [],
    productSelected: financialProductEmpty,
    query: '',
    productStatus: { status: 'initial' }
};
interface useFinancialProductsProps { productRepository: FinancialProductsRepository, autoLoadProducts?: boolean }
export interface FinancialProductsHook {
    actions: {
        getProducts: () => Promise<void>;
        selectProduct: (product: FinancialProduct) => void;
        changeQuery: (query: string) => void;
        search: (query: string) => Promise<void>;
    }
    state: FinancialProductsState;
}

export const financialProductsHook: FinancialProductsHook = {
    state: initialState,
    actions: {
        changeQuery: () => { },
        getProducts: async () => { },
        search: async () => { },
        selectProduct: () => { },
    }
}
export const useFinancialProducts = ({ productRepository, autoLoadProducts = true }: useFinancialProductsProps): FinancialProductsHook => {
    const productsRepository = useMemo(() => {
        return productRepository;
    }, [])
    const [state, dispatch] = useReducer(reducer, initialState);

    const getProducts = async () => {
        dispatch({ type: 'updateProductsStatus', payload: { status: "loading" }, },);
        try {
            const products = await productsRepository.getAll();
            dispatch({ type: 'updatedProducts', payload: products, },);
        } catch (error) {
            dispatch({ type: 'updateProductsStatus', payload: { status: 'failure', error: 'Error desconocido.' }, },);
        }
    }

    const search = async (query: string) => {
        dispatch({ type: 'updateProductsStatus', payload: { status: "loading" }, },);
        try {
            const products = await productsRepository.getBy({ query });
            dispatch({ type: 'updatedProducts', payload: products, },);
        } catch (error) {
            dispatch({ type: 'updateProductsStatus', payload: { status: 'failure', error: 'Error desconocido.' }, },);
        }
    }
    const searchWithDelayMemo =
        useMemo(() => {
            const delayDuration = 550;
            const searchWithDelay = debounce(search, delayDuration);
            return searchWithDelay;
        }, []);
    const changeQuery = (query: string) => {
        dispatch({ type: 'updateQuery', payload: query });
        searchWithDelayMemo(query);
    }

    const selectProduct = (product: FinancialProduct) => {
        dispatch({ type: 'selectProduct', payload: product });
    }

    useEffect(() => {
        if (autoLoadProducts) {
            getProducts();
        }
    }, [])

    return {
        actions: {
            getProducts,
            selectProduct,
            changeQuery,
            search,
        },
        state
    }
}