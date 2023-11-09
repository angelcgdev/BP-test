import { useState } from "react";
import { FinancialProductsRepository } from "../domain/repositories/financialProductsRepository";
import { FinancialProduct } from "../domain/entities/financialProduct";

type DeleteFinantialProductStatus = 'initial' | 'loading' | 'successfully' | 'failure';
type DeleteModalStatus = 'opened' | 'closed';
export interface useFinantialProductDeleteProps {
    productRepository: FinancialProductsRepository,
    product: FinancialProduct,
    deleteSuccess?: () => void,
    deleteFailed?: () => void,
}
export const useFinantialProductDelete = ({ productRepository, product, deleteFailed, deleteSuccess }: useFinantialProductDeleteProps) => {
    const [deleteStatus, setDeleteStatus] = useState<DeleteFinantialProductStatus>('initial');
    const [modalStatus, setModalStatus] = useState<DeleteModalStatus>('closed');
    const deleteProduct = async () => {
        setDeleteStatus('loading');
        try {
            await productRepository.delete(product.id);
            setDeleteStatus('successfully');
            if (deleteSuccess) {
                deleteSuccess();
            }
        } catch (error) {
            setDeleteStatus('failure');
            if (deleteFailed) {
                deleteFailed();
            }
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