import { FinancialProduct } from "../../../domain/entities/financialProduct";
import { FinantialProductCreateRequest } from "../requests/finantialProductCreateRequest";
import { FinantialProductUpdateRequest } from "../requests/finantialProductUpdateRequest";
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
    async create(data: FinantialProductCreateRequest): Promise<FinancialProduct> {
        await delay(1000);
        return data;
    }
    async updated(data: FinantialProductUpdateRequest): Promise<FinancialProduct> {
        await delay(1000);
        return data;
    }
    async delete(id: string) {
        await delay(1000);
        return;
    }
}