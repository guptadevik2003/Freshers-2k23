const { Schema, model } = require('mongoose')

const StudentSchema = new Schema({

    studentId: {
        type: String,
    },
    fullName: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    emailId: {
        type: String,
    },
    emailQRSent: {
        type: Boolean,
        default: false,
    },
    entryRegistered: {
        type: Boolean,
        default: false,
    },
    entryRegisteredAt: {
        type: Date,
    },
    entryRegisteredBy: {
        type: String,
    },

}, { timestamps: true })

module.exports = model('Student', StudentSchema, 'Students')
