import { FinancialProduct } from "../../domain/entities/financialProduct";
import { FinancialProductsRepository } from "../../domain/repositories/financialProductsRepository";
import { FinancialProductsByQueryRequest } from "../../domain/requests/finantialProductsByQueyRequest";
import { FinancialProductsLocalApi } from "../datasources/local/financialProductsLocalApi";

export class FinancialProductsRepositoryImpl implements FinancialProductsRepository {
    private productsApi = new FinancialProductsLocalApi();
    // get(): Promise<FinancialProduct> {
    //     return this.productsApi.getByQuery(props.query);
    // }
    add(): Promise<FinancialProduct> {
        throw new Error("Method not implemented.");
    }
    update(): Promise<FinancialProduct> {
        throw new Error("Method not implemented.");
    }
    delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<FinancialProduct[]> {
        return this.productsApi.getAll();
    }
    getBy(props: FinancialProductsByQueryRequest): Promise<FinancialProduct[]> {
        return this.productsApi.getByQuery(props.query);
    }
}