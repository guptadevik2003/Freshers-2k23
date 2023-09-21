const { Schema, model } = require('mongoose')

const AdminSchema = new Schema({

    fullName: {
        type: String,
    },
    emailId: {
        type: String,
    },
    password: {
        type: String,
    },
    isDevik: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })

module.exports = model('Admin', AdminSchema, 'Admins')
