import { Response } from "express";
import { HttpError } from "routing-controllers";
import { BaseOutput } from "../api/dtos/common/output.dto";

export const errorResponse = (response: Response, error: HttpError): BaseOutput => {
  response.status(error.httpCode);
  return { ok: false, error };
};

export const getError = (error: unknown) => {
  if (error instanceof Error) return error;

  try {
    return new Error(JSON.stringify(error));
  } catch {
    return new Error(String(error));
  }
};

export const reportError = (error: unknown) => {
  if (error instanceof Error) {
    // send the error to a logging service
    console.log(`[error] ${error}`);
  }
};
