export const errorHandler = (statusCode, message) => {
  const error = new Error(message);  // The message is passed to the Error constructor
  error.statusCode = statusCode;     // Attach the statusCode to the error object
  return error;                      // Return the error object
};
