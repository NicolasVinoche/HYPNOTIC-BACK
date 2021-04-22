module.exports = {
    async error404(request, response) {
        response.status(404).json({
            errors: {
                message: "Ressource not found",
                url: request.url,
                method: request.method
            }
        })
    },
    async error500(error, _, response, __) {
        response.status(500).json({
            errors: {
                message: "Fatal error",
                messageDetail: error.message,
                infos: error
            }
        })
    },
}