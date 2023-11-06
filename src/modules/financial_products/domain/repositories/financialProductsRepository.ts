import { FinancialProductsByQueryRequest } from "../requests/finantialProductsByQueyRequest";
import { FinancialProduct } from "../entities/financialProduct";

export abstract class FinancialProductsRepository {
    abstract getAll(): Promise<FinancialProduct[]>;
    abstract getBy(props: FinancialProductsByQueryRequest): Promise<FinancialProduct[]>;
    // abstract get(): Promise<FinancialProduct>;
    abstract add(): Promise<FinancialProduct>;
    abstract update(): Promise<FinancialProduct>;
    abstract delete(): Promise<void>;
}