export interface CreateFinancialProductFormErrors {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

export const financialProductFormErrorsEmpty: CreateFinancialProductFormErrors = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
}