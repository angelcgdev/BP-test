import { useEffect, useState } from "react";
import { CreateFinancialProductForm, financialProductFormEmpty } from "../ui/views/models/createFinancialProductForm";
import { CreateFinancialProductFormErrors, financialProductFormErrorsEmpty } from "../ui/views/models/createFinancialProductFormErrors";
import { FinancialProductsRepository } from "../domain/repositories/financialProductsRepository";

type CreateFinantialProductStatus = 'initial' | 'loading' | 'successfully' | 'failure';
export interface useFinantialProductCreateProps {
    productRepository: FinancialProductsRepository,
}
export const useFinantialProductCreate = ({ productRepository }: useFinantialProductCreateProps) => {

    const [form, setForm] = useState<CreateFinancialProductForm>(financialProductFormEmpty);
    const [errors, setErrors] = useState<CreateFinancialProductFormErrors>(financialProductFormErrorsEmpty);
    const [createStatus, setCreateStatus] = useState<CreateFinantialProductStatus>('initial');
    const handleChange = (key: keyof CreateFinancialProductForm, value: string | Date) => {
        if (key === 'date_release') {
            const valueConverted = value as Date;
            let dateRevision = new Date(valueConverted);
            dateRevision.setUTCFullYear(dateRevision.getUTCFullYear() + 1)
            setForm((form) => ({ ...form, [key]: valueConverted, date_revision: dateRevision }));
        } else {
            setForm((form) => ({ ...form, [key]: value }));
        }
    }

    const handleResetform = () => {
        setForm(financialProductFormEmpty);
    }
    const getErrors = (): CreateFinancialProductFormErrors => {
        let newErrors = { ...financialProductFormErrorsEmpty };
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
                    const today = new Date();
                    today.setUTCHours(0, 0, 0, 0);
                    const todayTome = today.getTime();
                    const dateReleaseTime = form['date_release'].getTime();
                    if (dateReleaseTime <= todayTome) {
                        newErrors['date_release'] = "Fecha liberación no válida!";
                    }
                    break;
                case 'date_revision':
                    const dateRelease = new Date(form['date_release']);
                    dateRelease.setUTCHours(0, 0, 0, 0);
                    const dateRevision = new Date(form['date_revision']);
                    dateRevision.setUTCHours(0, 0, 0, 0);
                    const oneYearAfterRelease = new Date(dateRelease);
                    oneYearAfterRelease.setFullYear(oneYearAfterRelease.getUTCFullYear() + 1);

                    if (dateRevision.getTime() !== oneYearAfterRelease.getTime()) {
                        newErrors['date_revision'] = "Fecha revisión no válida!";
                    }
                    break;
            }
        });
        return newErrors;
    }

    const haveErrors = (errors: CreateFinancialProductFormErrors): boolean => {
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

    useEffect(() => {
        handleChange('date_release', new Date())
    }, [])

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