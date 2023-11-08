import { FinancialProductFormErrors, financialProductFormErrorsEmpty } from "../../../ui/models/financialProductFormErrors";

export class CreateProductInvalidFieldsException extends Error {
    errors: FinancialProductFormErrors;
    constructor(
        errors: FinancialProductFormErrors
    ) {
        super();
        this.errors = errors;
    }

    static fromJson(json: Partial<FinancialProductFormErrors>) {
        let erros: FinancialProductFormErrors = { ...financialProductFormErrorsEmpty, ...json };
        return new CreateProductInvalidFieldsException(erros);
    }

}