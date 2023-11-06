import { FinancialProduct } from "../../../domain/entities/financialProduct";
import { FinantialProductCreateRequest } from "../../../domain/requests/finantialProductCreateRequest";
import { FinantialProductUpdateRequest } from "../../../domain/requests/finantialProductUpdateRequest";


export class FinancialProductsRemoteApi {

    baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
    path = '/bp/products';
    autorId = '';
    async getAll(): Promise<FinancialProduct[]> {
        const response = await fetch(
            `${this.baseUrl}${this.path}`,
            {
                method: 'GET',
                headers: {
                    autorId: this.autorId,
                }
            },
        );
        return []
    }
    async getByQuery(query: string): Promise<FinancialProduct[]> {
        const response = await fetch(
            `${this.baseUrl}${this.path}`,
            {
                method: 'GET',
                headers: {
                    autorId: this.autorId,
                }
            },
        );
        return []
    }
    async create(data: FinantialProductCreateRequest) {
        const response = await fetch(
            `${this.baseUrl}${this.path}`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    autorId: this.autorId,
                }
            },
        );
    }
    async updated(data: FinantialProductUpdateRequest) {
        const response = await fetch(
            `${this.baseUrl}${this.path}`,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    autorId: this.autorId,
                }
            },
        );

    }
    async delete(id: string) {
        const response = await fetch(
            `${this.baseUrl}${this.path}`,
            {
                method: 'DELETE',
                headers: {
                    autorId: this.autorId,
                }
            },
        );
    }
}