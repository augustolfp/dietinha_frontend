import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === "object" && error != null && "status" in error;
}

export function isErrorWithMessage(
    error: unknown
): error is { message: string } {
    return (
        typeof error === "object" &&
        error != null &&
        "message" in error &&
        typeof (error as any).message === "string"
    );
}

interface ErrData {
    message: string;
}

export function isMessageOnData(errData: unknown): errData is ErrData {
    return (
        typeof errData === "object" && errData !== null && "message" in errData
    );
}
