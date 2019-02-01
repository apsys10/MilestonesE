module.exports = {
    onDemandEntries: {
      // period (in ms) where the server will keep pages in the buffer
      maxInactiveAge:  1000 * 60 * 60,
      // number of pages that should be kept simultaneously without being disposed
      pagesBufferLength: 5,
    }
  }