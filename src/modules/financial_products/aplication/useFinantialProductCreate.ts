import { useState } from "react";
import { CreateFinancialProductForm, financialProductFormEmpty } from "../ui/views/models/createFinancialProductForm";
import { CreateFinancialProductFormErrors, financialProductFormErrorsEmpty } from "../ui/views/models/createFinancialProductFormErrors";
import { FinancialProductsRepository } from "../domain/repositories/financialProductsRepository";

type CreateFinantialProductStatus = 'inital' | 'loading' | 'successfully' | 'failure';
export interface useFinantialProductCreateProps {
    productRepository: FinancialProductsRepository,
}
export const useFinantialProductCreate = ({ productRepository }: useFinantialProductCreateProps) => {

    const [form, setForm] = useState(financialProductFormEmpty);
    const [errors, setErrors] = useState(financialProductFormErrorsEmpty);
    const [createStatus, setCreateStatus] = useState<CreateFinantialProductStatus>('inital');
    const handleChange = (key: keyof CreateFinancialProductForm, value: string | Date) => {
        if (key === 'date_release') {
            const valueConverted = value as Date;
            const dateRevision = valueConverted;
            dateRevision.setFullYear(dateRevision.getFullYear() + 1)
            return setForm((form) => ({ ...form, [key]: valueConverted, date_revision: dateRevision }));
        }
        setForm((form) => ({ ...form, [key]: value }));
    }

    const handleResetform = () => {
        setForm(financialProductFormEmpty);
    }
    const getErrors = (): CreateFinancialProductFormErrors => {
        let newErrors = { ...financialProductFormErrorsEmpty };
        console.log("errors default", newErrors)
        Array.from(Object.keys(form)).forEach((key) => {
            switch (key) {
                case 'id':
                    const idMinLength = 3;
                    const idMaxLength = 10;
                    const idLength = form[key].length;
                    if (idLength < idMinLength || idLength > idMaxLength) {
                        newErrors['id'] = "ID no válido!"
                    }
                    break;

                case 'name':
                    const nameMinLength = 5;
                    const mameMaxLength = 100;
                    const nameLength = form[key].length;
                    if (nameLength < nameMinLength || nameLength > mameMaxLength) {
                        newErrors['name'] = "Nombre no válido!"
                    }
                    break;
                case 'description':
                    const descriptionMinLength = 10;
                    const descriptionMaxLength = 200;
                    const descriptionLength = form[key].length;
                    if (descriptionLength < descriptionMinLength || descriptionLength > descriptionMaxLength) {
                        newErrors['description'] = "Descripción no válida!"
                    }
                    break;
                case 'logo':
                    const logoMinLength = 1;
                    const logoLength = form[key].length;
                    if (logoLength < logoMinLength) {
                        newErrors['logo'] = "Logo es requerido!"
                    }
                    break;
                case 'date_release':
                    const minStart = new Date();
                    minStart.setUTCHours(0, 0, 0, 0);
                    const startTime = minStart.getTime();
                    const dateReleaseTime = form['date_release'].getTime();
                    if (dateReleaseTime < startTime) {
                        newErrors['date_release'] = "Fecha liberación no válida!";
                    }
                    break;
                case 'date_revision':

                    break;
            }
        });
        return newErrors;
    }

    const haveErrors = (errors: CreateFinancialProductFormErrors) => {
        return Array.from(Object.entries(errors)).every((entry) => entry[0] !== '');
    }

    const handleSubmit = async () => {
        const errors = getErrors();
        setErrors(errors);
        if (!haveErrors(errors)) {
            await createProduct();
        }

    }

    const createProduct = async () => {
        try {
            setCreateStatus('loading')
            await productRepository.add(form);
            setCreateStatus('successfully');
        } catch (error) {
            setCreateStatus('failure');
        }

    }

    return {
        actions: {
            handleSubmit,
            handleChange,
            handleResetform,
        },
        state: {
            form,
            errors,
            createStatus,
        }
    }
}