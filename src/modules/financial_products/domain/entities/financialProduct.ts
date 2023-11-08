export interface FinancialProduct {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}

export function financialProductFromFinancialProductFromApi(product: FinancialProductFromApi): FinancialProduct {
    const { date_release, date_revision, ...rest } = product;
    return {
        ...rest,
        date_release: new Date(Date.parse(date_release)),
        date_revision: new Date(Date.parse(date_revision)),
    }
}

export const financialProductEmpty: FinancialProduct = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: new Date(),
    date_revision: new Date(),
}


export interface FinancialProductFromApi {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

export function financialProductForApiFromFinancialProduct(product: FinancialProduct): FinancialProductFromApi {
    const { date_release, date_revision, ...rest } = product;
    return {
        ...rest,
        date_release: date_release.toISOString(),
        date_revision: date_release.toISOString(),
    }
}