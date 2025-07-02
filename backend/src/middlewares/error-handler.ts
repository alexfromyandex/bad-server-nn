import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500
    const message =
        statusCode === 500 ? 'На сервере произошла ошибка' : err.message
    console.log(err)

    // В dev выводим подробности
    if (process.env.NODE_ENV !== 'production') {
        console.error('Ошибка:', err)
    }

    const match = err.stack.match(/\(([^)]+\.ts:\d+:\d+)\)/) || err.stack.match(/at\s+(.+\.ts:\d+:\d+)/);
    res.status(statusCode).send({ message, exp: err.message, line: err.lineNumber, file: err.file, match: match ? match[1] : null})

    // next()
}

export default errorHandler
