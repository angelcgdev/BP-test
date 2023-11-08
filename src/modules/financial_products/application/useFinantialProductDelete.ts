import { useState } from "react";
import { FinancialProductsRepository } from "../domain/repositories/financialProductsRepository";
import { FinancialProduct } from "../domain/entities/financialProduct";

type DeleteFinantialProductStatus = 'initial' | 'loading' | 'successfully' | 'failure';
type DeleteModalStatus = 'opened' | 'closed';
export interface useFinantialProductDeleteProps {
    productRepository: FinancialProductsRepository,
    product: FinancialProduct
}
export const useFinantialProductDelete = ({ productRepository, product }: useFinantialProductDeleteProps) => {
    const [deleteStatus, setDeleteStatus] = useState<DeleteFinantialProductStatus>('initial');
    const [modalStatus, setModalStatus] = useState<DeleteModalStatus>('closed');
    const deleteProduct = async () => {
        setDeleteStatus('loading');
        try {
            await productRepository.delete(product.id);
            setDeleteStatus('successfully');
        } catch (error) {
            setDeleteStatus('failure');
        }
    }
    return {
        state: {
            deleteStatus,
            modalStatus,
        },
        actions: {
            deleteProduct,
            setModalStatus,
        }
    }
}