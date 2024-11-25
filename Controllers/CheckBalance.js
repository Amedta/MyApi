const axios = require('axios');
class AuthCheckBalanceController {
    static async CheckBalance(req, res) {
        try {
            const { msisdn } = req.body; 
            if (!msisdn) {
                return res.status(400).json({
                    success: false,
                    message: "msisdn is required."
                });
            }
            const config = {
                method: 'post',
                url: 'http://172.28.12.204:5225/api/Consumer/GetCheckTransfer',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    msisdn: msisdn,
                },
            };
            const response = await axios(config);
            const { data } = response;
            if (data && data.code === "00") {
                return res.status(200).json({
                    success: true,
                    code: data?.code
                });
            } else {
                return res.status(400).json({
                    success: false,
                    code: data?.code
                });
            }
        } catch (error) {
            if (error.response) {
                return res.status(error.response.status || 500).json({
                    success: false,
                    message: "Error from external API.",
                    error: error.response.data || 'No additional error details provided.',
                });
            }
            if (error.request) {
                return res.status(500).json({
                    success: false,
                    message: 'No response received from external API.',
                    error: error.message || 'Unknown error occurred.',
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Internal server error occurred.',
                error: error.message || 'Unknown error occurred.',
            });
        }
    }
}
module.exports = AuthCheckBalanceController;
    // static async SentOTP(res,msisdn) {
    //     const otp = otpGenerator.generate(6, {
    //         upperCaseAlphabets: false,
    //         lowerCaseAlphabets: false,
    //         specialChars: false,
    //     });
    //     const ref = otpGenerator.generate(6, {
    //         upperCaseAlphabets: false,
    //         lowerCaseAlphabets: true,
    //         specialChars: false,
    //     });
    //     const message = `Your OTP code is: ${otp}`;

    //     try {
    //         const pool = await ConnectToPostgres();
    //         const insertQuery = `
    //             INSERT INTO public.auth (ref, otp, msisdn)
    //             VALUES ($1, $2, $3) RETURNING id;
    //         `;
    //         const result = await pool.query(insertQuery, [ref, otp, msisdn]);
    //         await sendSMS(msisdn, message);

    //         return res.status(200).json({
    //             resultCode: 0,
    //             resultDesc: 'Operation Success',
    //             data: {
    //                 msisdn,
    //                 ref,
    //             },
    //         });
    //     } catch (err) {
    //         console.error('Error:', err);
    //         return res.status(500).json({
    //             RespCode: 500,
    //             RespMessage: 'An error occurred',
    //             RespError: err.message,
    //         });
    //     }
    // }
// async function sendSMS(msisdn, message) {
//     const twilio = require('twilio');
//     const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
//     try {
//         await client.messages.create({
//             body: message,
//             from: process.env.TWILIO_PHONE_NUMBER,
//             to: msisdn,
//         });
//     } catch (error) {
//         console.error('Error sending SMS:', error);
//         throw error;
//     }
// }
