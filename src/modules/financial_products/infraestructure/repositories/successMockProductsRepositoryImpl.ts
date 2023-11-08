import { FinancialProduct } from "../../domain/entities/financialProduct";
import { FinancialProductsRepository } from "../../domain/repositories/financialProductsRepository";
import { FinancialProductsByQueryRequest } from "../datasources/requests/finantialProductsByQueyRequest";
import { financialProducts } from "../datasources/local/db";

export class successMockProductsRepositoryImpl implements FinancialProductsRepository {

    async add(product: FinancialProduct): Promise<FinancialProduct> {
        return product;
    }
    async update(product: FinancialProduct): Promise<FinancialProduct> {
        return product;
    }
    async delete(id: string): Promise<void> {
        return;
    }
    async getAll(): Promise<FinancialProduct[]> {
        return financialProducts;
    }
    async getBy(props: FinancialProductsByQueryRequest): Promise<FinancialProduct[]> {
        return [financialProducts[0]];
    }
    async verify(id: string): Promise<boolean> {
        return false;
    }
}