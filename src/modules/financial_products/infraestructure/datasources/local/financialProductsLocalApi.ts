import { financialProductForApiFromFinancialProduct } from "../../../domain/entities/financialProduct";
import { FinantialProductCreateRequest } from "../requests/finantialProductCreateRequest";
import { FinantialProductUpdateRequest } from "../requests/finantialProductUpdateRequest";
import { FinantialProductDeleteResponse, FinantialProductGetResponse, FinantialProductPostResponse, FinantialProductPutResponse } from "../responses/FinancialProductsResponseApi";
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
    async getAll(): Promise<FinantialProductGetResponse> {
        await delay(2000);
        return financialProducts.map(product => financialProductForApiFromFinancialProduct(product));
    }
    async getByQuery(query: string): Promise<FinantialProductGetResponse> {
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
        }).map(product => financialProductForApiFromFinancialProduct(product));
    }
    async create(data: FinantialProductCreateRequest): Promise<FinantialProductPostResponse> {
        await delay(1000);
        return data;
    }
    async updated(data: FinantialProductUpdateRequest): Promise<FinantialProductPutResponse> {
        await delay(1000);
        return data;
    }
    async delete(id: string): Promise<FinantialProductDeleteResponse> {
        await delay(1000);
        return;
    }

    async verify(id: string): Promise<boolean>{
        await delay(1000);
        return false;

    }
}