const setResponse = (status, data = '') => {
  return {
    status,
    data,
    error: !data && setErrorResponse(status)
  }
}

const setErrorResponse = (status) => {
  switch (status) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not Found';
    case 500:
      return 'Internal Server Error';
    default:
      return 'Something wrong, please call administrator'
  }
}

export {
  setResponse
}