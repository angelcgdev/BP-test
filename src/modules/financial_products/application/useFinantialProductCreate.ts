import { useEffect, useState } from "react";
import { FinancialProductForm, FinancialProductFormKeys, financialProductFormEmpty } from "../ui/models/financialProductForm";
import { FinancialProductFormErrors, financialProductFormErrorsEmpty } from "../ui/models/financialProductFormErrors";
import { FinancialProductsRepository } from "../domain/repositories/financialProductsRepository";

type CreateFinantialProductStatus = 'initial' | 'loading' | 'successfully' | 'failure';
export interface useFinantialProductCreateProps {
    productRepository: FinancialProductsRepository,
}
export const useFinantialProductCreate = ({ productRepository }: useFinantialProductCreateProps) => {

    const [form, setForm] = useState<FinancialProductForm>(financialProductFormEmpty);
    const [errors, setErrors] = useState<FinancialProductFormErrors>(financialProductFormErrorsEmpty);
    const [createStatus, setCreateStatus] = useState<CreateFinantialProductStatus>('initial');
    const handleChange = (key: FinancialProductFormKeys, value: string | Date) => {
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
    const getErrors = (): FinancialProductFormErrors => {
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

    const haveErrors = (errors: FinancialProductFormErrors): boolean => {
        return Object.values(errors).some((entry: string) => entry !== '');
    }

    const handleSubmit = async () => {
        console.log("handleSubmit===>")
        const errors = getErrors();
        setErrors(errors);
        if (!haveErrors(errors)) {
            await createProduct();
        }

    }

    const createProduct = async () => {
        try {
            setCreateStatus('loading')
            const idAlreadyRegistered = await productRepository.verify(form.id);
            if (idAlreadyRegistered) {
                setErrors({ ...errors, id: 'ID ya existe!' });
                setCreateStatus('initial');
                return;
            }
            await productRepository.add(form);
            setCreateStatus('successfully');
        } catch (error) {
            console.log("createProduct error", error)
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