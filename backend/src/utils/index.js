
module.exports = {
  formatError: (key, message) => {
    return {
      errors: {
        details: [
          {
            context: { key },
            message,
          },
        ],
      },
    }
  }
}
