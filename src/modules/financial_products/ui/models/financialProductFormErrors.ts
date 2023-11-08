export interface FinancialProductFormErrors {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

export const financialProductFormErrorsEmpty: FinancialProductFormErrors = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
}