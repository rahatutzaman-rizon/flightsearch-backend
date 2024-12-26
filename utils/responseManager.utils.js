
import { getReasonPhrase } from "http-status-codes";

const response = (
  res,
  code,
  status,
  data,
  message
) => {
  const defaultMessage = getReasonPhrase(code);
  const finalMessage = message || defaultMessage;

  return res.status(code).json({
    status,
    data,
    message: finalMessage,
  });
};

export default response;