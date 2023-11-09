import { FinancialProduct, FinancialProductFromApi } from "../../../domain/entities/financialProduct";
import { CreateProductInvalidFieldsException } from "../expections/createProductException";
import { DeleteProductException as DeleteProductInvalidIdException } from "../expections/deleteProductException";
import { UpdateProductInvalidFieldsException } from "../expections/updateProductExpeption";
import { FinantialProductCreateRequest } from "../requests/finantialProductCreateRequest";
import { FinantialProductUpdateRequest } from "../requests/finantialProductUpdateRequest";
import { FinantialProductDeleteResponse, FinantialProductGetResponse, FinantialProductPostResponse, FinantialProductPutResponse } from "../responses/FinancialProductsResponseApi";

export class FinancialProductsRemoteApi {

    baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
    path = '/bp/products';
    authorId = "1232132";

    private cache: FinantialProductGetResponse = [];
    async getAll(): Promise<FinantialProductGetResponse> {
        const response = await fetch(
            `${this.baseUrl}${this.path}`,
            {
                method: 'GET',
                headers: {
                    authorId: this.authorId,
                }
            },
        );
        const json = await response.json();
        const result = Array.from<FinancialProductFromApi>(json);
        this.cache = result;
        return result;
    }
    async getByQuery(query: string): Promise<FinantialProductGetResponse> {
        const queryNormalized = query.toLowerCase();
        return this.cache.filter((product) => {
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
    async create(data: FinantialProductCreateRequest): Promise<FinantialProductPostResponse> {
        const response = await fetch(
            `${this.baseUrl}${this.path}`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    authorId: this.authorId,
                },
                body: JSON.stringify(data)
            },
        );
        if (response.status === 206) {
            const json = await response.json();
            throw CreateProductInvalidFieldsException.fromJson(json);
        }
        return await response.json();
    }
    async update(data: FinantialProductUpdateRequest): Promise<FinantialProductPutResponse> {
        const response = await fetch(
            `${this.baseUrl}${this.path}`,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    authorId: this.authorId,
                },
                body: JSON.stringify(data)
            },
        );
        if (response.status === 206) {
            const json = await response.json();
            throw UpdateProductInvalidFieldsException.fromJson(json);
        }
        return await response.json();
    }
    async delete(id: string): Promise<FinantialProductDeleteResponse> {
        const response = await fetch(
            `${this.baseUrl}${this.path}?id=${id}`,
            {
                method: 'DELETE',
                headers: {
                    authorId: this.authorId,
                },
            },
        );
        if (response.status === 404) {
            throw new DeleteProductInvalidIdException();
        }
        return;
    }

    async verify(id: string): Promise<boolean> {
        const response = await fetch(
            `${this.baseUrl}${this.path}/verification?id=${id}`,
            {
                method: 'GET',
                headers: {
                    authorId: this.authorId,
                },
            },
        );
        const data = await response.json();
        return data;
    }
}