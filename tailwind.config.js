const colors = require("tailwindcss/colors");

module.exports = {
    theme:{
        fontFamily:{
            sans:["Poppins", "sans-serif"]
        },
        extend:{
            colors:{
                "trueGray":colors.trueGray
            }
        }
    }
}