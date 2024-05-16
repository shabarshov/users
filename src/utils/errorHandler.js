const handleHttpStatusErrors = (status) => {
  if (status === 404) {
    return {
      errors: [{ code: 404, message: "Not found" }],
    }
  }

  if (status === 500) {
    return {
      errors: [{ code: 500, message: "Server error" }],
    }
  }
}

module.exports = {
  handleHttpStatusErrors,
}
