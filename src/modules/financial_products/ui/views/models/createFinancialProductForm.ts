export interface CreateFinancialProductForm {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}

const financialProductDefaultDate = new Date(Date.UTC(0));

export const financialProductFormEmpty: CreateFinancialProductForm = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: financialProductDefaultDate,
    date_revision: financialProductDefaultDate,
}