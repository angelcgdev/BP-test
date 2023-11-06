import { FinancialProduct } from "../../../domain/entities/financialProduct";
import { FinantialProductCreateRequest } from "../../../domain/requests/finantialProductCreateRequest";
import { FinantialProductUpdateRequest } from "../../../domain/requests/finantialProductUpdateRequest";
import { financialProducts } from "./db";

function delay(ms: number): Promise<void> {
    const promise = new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
    return promise;
}

export class FinancialProductsLocalApi {
    async getAll(): Promise<FinancialProduct[]> {
        await delay(2000);
        return financialProducts;
    }
    async getByQuery(query: string): Promise<FinancialProduct[]> {
        await delay(2000);
        const queryNormalized = query.toLowerCase();
        return financialProducts.filter((product) => {
            if (product.id.toLocaleLowerCase().includes(queryNormalized)) {
                return true;
            } if (product.name.toLocaleLowerCase().includes(queryNormalized)) {
                return true;
            }
            if (product.description.toLocaleLowerCase().includes(queryNormalized)) {
                return true;
            }
            return false;
        });
    }
    async create(data: FinantialProductCreateRequest) { }
    async updated(data: FinantialProductUpdateRequest) { }
    async delete(id: string) { }
}