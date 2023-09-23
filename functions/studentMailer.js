module.exports = ({ app, express }) => {
    express.studentMailer = async () => {

        let NodeMailer = require('../otherFunctions/NodeMailer')
        let StudentSchema = require('../schemas/Student')

        let studentData = await StudentSchema.find({ emailQRSent: false })
        let studentLength = studentData.length
        
        for (const student of studentData) {
            
            let fullName = student.fullName
            let studentId = student.studentId
    
            let QRBase = await Buffer.from(
                JSON.stringify({
                    studentId,
                    fullName
                }),
                'utf-8'
            ).toString('base64')
    
            let QRLink = `https://shubharambh.net/qr/${QRBase}`
    
            console.log(`Sending email to ${studentId}@geu.ac.in - ${fullName} - ${studentLength} Students Left`)
    
            let sendInfo = await NodeMailer({
                from: 'Freshers 2k23 <no-reply@shubharambh.net>',
                to: `${studentId}@geu.ac.in`,
                subject: `Join Us for SHUBHAARAMBH 2K23!`,
                text: `${QRLink}`,
                html: `<b>DEAR ${fullName.toUpperCase()},</b><br><br>We hope this message finds you well as you embark on an exciting journey at Graphic Era University. We are thrilled to invite you to our much-anticipated Freshers' Event, SHUBHAARAMBH 2K23<br><br><b>Event Details:</b><br><b>- Date: </b>22nd September 2023<br><b>- Time: </b>Starting at 3:00 PM<br><br>SHUBHAARAMBH 2K23 promises to be a spectacular start to your college experience, filled with fun, laughter, and memorable moments. We have planned an array of activities and surprises to make your day truly special.<br><br><b>To join us for this remarkable event, all you need to do is click on the following link for the QR Codes and show them at the entrance:</b><br><br>${QRLink}<br><br><b>For any queries contact:</b><br><br>Web Development Head,<br>Devik Gupta<br>guptadevik2003@gmail.com<br>+917017385123<br><br>We encourage you to mark this date on your calendar and prepare for an unforgettable celebration with your fellow freshers. It's an opportunity to connect, make new friends, and kickstart your college journey on a high note.<br><br><b>Please keep an eye on our Instagram handle and website:</b><br><br>https://shubharambh.net<br><br>https://www.instagram.com/_geufreshers2023<br><br>For any further updates or instructions leading up to the event. If you have any questions or require assistance, feel free to reach out to our organizing team through the form or contact details provided on the website.<br><br>Get ready to embark on an exciting adventure at Graphic Era University and let's make SHUBHAARAMBH 2K23 a memorable beginning!<br><br>We can't wait to welcome you to our college family.<br><br>Warm regards,<br>The Organizing Committee<br>SHUBHAARAM 2K23`
            })
    
            if(sendInfo){
                if(sendInfo.accepted.length){
                    await StudentSchema.findOneAndUpdate({ studentId: studentId }, { emailQRSent: true }).exec()
                    console.log(sendInfo.messageId)
                    studentLength--;
                }
            }

        }

    }
}
