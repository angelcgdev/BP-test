import { useEffect } from "react";
import { useSnackbar } from "../components/SpackbarProvider";
import { useBPTheme } from "../components";
interface useSnackbarReponseProps {
    status: string,
    success?: {
        message?: string,
        actionText?: string;
        onActionPress?: () => void;
    }
    errorMessage?: string,
}

export const useSnackbarReponse = (props: useSnackbarReponseProps) => {
    const theme = useBPTheme();
    const snackbar = useSnackbar();
    useEffect(() => {
        if (props.status === 'successfully') {
            snackbar.actions.show({
                message: props.success?.message ?? 'processo exitoso',
                actionText: props.success?.actionText ?? 'ok',
                onActionPress: () => {
                    snackbar.actions.dismiss();
                    if (props.success?.onActionPress) {
                        props.success.onActionPress();
                    }
                }
            });
        }
        if (props.status === 'failure') {
            snackbar.actions.show({
                message: props.errorMessage ?? 'ocurrio un error.',
                backgroundColor: theme.colors.error,
                textColor: theme.colors.onError,
                onActionPress: undefined
            });
        }
    }, [props.status])
}