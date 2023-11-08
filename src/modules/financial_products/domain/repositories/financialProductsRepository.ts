import { FinancialProductsByQueryRequest } from "../../infraestructure/datasources/requests/finantialProductsByQueyRequest";
import { FinancialProduct } from "../entities/financialProduct";

export abstract class FinancialProductsRepository {
    abstract getAll(): Promise<FinancialProduct[]>;
    abstract getBy(props: FinancialProductsByQueryRequest): Promise<FinancialProduct[]>;
    abstract add(product: FinancialProduct): Promise<FinancialProduct>;
    abstract update(product: FinancialProduct): Promise<FinancialProduct>;
    abstract delete(id: string): Promise<void>;
}