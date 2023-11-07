import { useCallback, useEffect, useMemo, useReducer } from "react";
import { FinancialProduct } from "../domain/entities/financialProduct";
import { FinancialProductsRepository } from "../domain/repositories/financialProductsRepository";
import { debounce } from "../../../utils/debounce";

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

type FinancialProductAction = UpdateProductsAction | UpdateQueryAction | ProductsStatusAction;

interface FinancialProductsState {
    products: FinancialProduct[],
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
    }
}
const initialState: FinancialProductsState = {
    products: [],
    query: '',
    productStatus: { status: 'initial' }
};
interface useFinancialProductsProps { producstRepository: FinancialProductsRepository, autoLoadProducts?: boolean }
export interface FinancialProductsHook {
    actions: {
        getProducts: () => void;
        changeQuery: (query: string) => void;
    }
    state: FinancialProductsState;
}

export const financialProductsHook = {
    state: initialState,
}
export const useFinancialProducts = ({ producstRepository, autoLoadProducts = true }: useFinancialProductsProps) => {
    const productsRepository = useMemo(() => {
        return producstRepository;
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

    useEffect(() => {
        if (autoLoadProducts) {
            getProducts();
        }
    }, [])

    return {
        actions: {
            getProducts,
            changeQuery,
            search,
        },
        state
    }
}