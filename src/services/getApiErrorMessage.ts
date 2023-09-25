import { FirebaseError } from "firebase/app";
import {
    isFetchBaseQueryError,
    isErrorWithMessage,
    isMessageOnData,
} from "./helpers";

export default function getApiErrorMessage(error: unknown) {
    let message = "Erro inesperado na API.";
    if (isFetchBaseQueryError(error)) {
        if (isMessageOnData(error.data)) {
            message = error.data.message;
        }
    }
    if (isErrorWithMessage(error)) {
        message = error.message;
    }
    if (error instanceof FirebaseError) {
        message = error.message;
    }

    return message;
}
