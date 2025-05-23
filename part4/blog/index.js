const app = require('./app') // the actual Express application
const logger = require('./utils/logger')

const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})