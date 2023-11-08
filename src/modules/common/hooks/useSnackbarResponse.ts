import { useEffect } from "react";
import { useSnackbar } from "../components/SpackbarProvider";
import { useBPTheme } from "../components";
interface useSnackbarReponseProps {
    status: string,
    successMessage?: string,
    errorMessage?: string,
}

export const useSnackbarReponse = (props: useSnackbarReponseProps) => {
    const theme = useBPTheme();
    const snackbar = useSnackbar();
    useEffect(() => {
        if (props.status === 'successfully') {
            snackbar.actions.show({
                message: props.successMessage ?? 'processo exitoso',
                actionText: 'ok',
                onActionPress: () => {
                    snackbar.actions.dismiss();
                }
            });
        }
        if (props.status === 'failure') {
            snackbar.actions.show({
                message: props.errorMessage ?? 'ocurrio un error.',
                backgroundColor: theme.colors.error,
                textColor: theme.colors.onError
            });
        }
    }, [props.status])
}