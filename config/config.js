module.exports = {
    ENV : process.env.NODE_ENV || 'developer',
    PORT : process.env.PORT || 8081 ,
    BASE_URL : process.env.BASE_URL || "http://localhost:80",
    MONGO_URI : process.env.MONGO_URI || "mongodb+srv://root:nitish123@cluster0-kgyzb.mongodb.net/test?retryWrites=true&w=majority"
}