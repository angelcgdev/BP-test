import { financialProductDefaultDate } from "../../../common/constants/defaultDate";

export interface FinancialProductForm {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}


export const financialProductFormEmpty: FinancialProductForm = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: financialProductDefaultDate,
    date_revision: financialProductDefaultDate,
}

export type FinancialProductFormKeys = keyof FinancialProductForm;