const { default: mongoose } = require("mongoose")

module.exports = {
    db: () => {
        mongoose.connect('mongodb+srv://rwa3jyotisj:R1NEpCMntRWjB8kV@ejs-final.mftudco.mongodb.net/ejs-project')
            .then(() => {
                console.log("database connected 👍")
            })
            .catch((err) => {
                console.log(err)
            })
    }
}