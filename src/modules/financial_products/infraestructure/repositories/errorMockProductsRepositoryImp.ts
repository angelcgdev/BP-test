import { FinancialProduct } from "../../domain/entities/financialProduct";
import { FinancialProductsRepository } from "../../domain/repositories/financialProductsRepository";
import { FinancialProductsByQueryRequest } from "../datasources/requests/finantialProductsByQueyRequest";

export class errorMockProductsRepositoryImpl implements FinancialProductsRepository {
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