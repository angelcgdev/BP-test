import { FinancialProduct, financialProductForApiFromFinancialProduct, financialProductFromFinancialProductFromApi } from "../../domain/entities/financialProduct";
import { FinancialProductsRepository } from "../../domain/repositories/financialProductsRepository";
import { FinancialProductsByQueryRequest } from "../datasources/requests/finantialProductsByQueyRequest";
import { FinancialProductsRemoteApi } from "../datasources/remote/financialProductsRemoteApi";

export class FinancialProductsRepositoryImpl implements FinancialProductsRepository {

    private productsApi = new FinancialProductsRemoteApi();

    add(product: FinancialProduct): Promise<FinancialProduct> {
        return this.productsApi.create(financialProductForApiFromFinancialProduct(product)).then((product) => financialProductFromFinancialProductFromApi(product));
    }
    update(product: FinancialProduct): Promise<FinancialProduct> {
        return this.productsApi.update(financialProductForApiFromFinancialProduct(product)).then((product) => financialProductFromFinancialProductFromApi(product));
    }
    delete(id: string): Promise<void> {
        return this.productsApi.delete(id);
    }
    getAll(): Promise<FinancialProduct[]> {
        return this.productsApi.getAll().then((products) => products.map((product) => financialProductFromFinancialProductFromApi(product)));
    }
    getBy(props: FinancialProductsByQueryRequest): Promise<FinancialProduct[]> {
        return this.productsApi.getByQuery(props.query).then((products) => products.map((product) => financialProductFromFinancialProductFromApi(product)));
    }
    verify(id: string): Promise<boolean> {
        return this.verify(id);
    }
}