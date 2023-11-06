import { FinancialProduct } from "../../domain/entities/financialProduct";
import { FinancialProductsRepository } from "../../domain/repositories/financialProductsRepository";
import { FinancialProductsByQueryRequest } from "../../domain/requests/finantialProductsByQueyRequest";
import { FinancialProductsLocalApi } from "../datasources/local/financialProductsLocalApi";

export class FinancialProductsRepositoryImpl implements FinancialProductsRepository {
    private productsApi = new FinancialProductsLocalApi();

    add(product: FinancialProduct): Promise<FinancialProduct> {
        return this.productsApi.create(product);
    }
    update(product: FinancialProduct): Promise<FinancialProduct> {
        return this.productsApi.updated(product);
    }
    delete(id: string): Promise<void> {
        return this.productsApi.delete(id);
    }
    getAll(): Promise<FinancialProduct[]> {
        return this.productsApi.getAll();
    }
    getBy(props: FinancialProductsByQueryRequest): Promise<FinancialProduct[]> {
        return this.productsApi.getByQuery(props.query);
    }
}