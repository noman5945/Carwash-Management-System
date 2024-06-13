import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/ZodError";
import { TErrorSources } from "../interface/error";
import handleValidationError from "../errors/ValidationError";
import AppError from "../errors/AppError";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "something went wrong";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];
  if (err instanceof ZodError) {
    const plainError = handleZodError(err);
    statusCode = plainError?.statusCode;
    message = plainError?.message;
    errorSources = plainError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const plainError = handleValidationError(err);
    statusCode = plainError?.statusCode;
    message = plainError?.message;
    errorSources = plainError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
