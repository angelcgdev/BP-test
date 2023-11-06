import { FinancialProduct } from "../entities/financialProduct";

export abstract class FinancialProductRepository {
    abstract get(): Promise<FinancialProduct>;
    abstract add(): Promise<FinancialProduct>;
    abstract update(): Promise<FinancialProduct>;
    abstract delete(): Promise<void>;
}