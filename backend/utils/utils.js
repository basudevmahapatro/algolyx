import crypto from "crypto";

export function generateOTP(){
    return crypto.randomInt(0,1000000).toString().padStart(6,"0");
}

export function getEmailHTML({ OTP }) {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Algolyx OTP Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

<table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f6f8; padding:20px;">
<tr>
<td align="center">
    
    <table width="500" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">

    <tr>
        <td align="center" style="padding:10px 20px;">
        <h2 style="margin:0; color:#333;">Verify Your Account</h2>
        </td>
    </tr>

    <tr>
        <td align="center" style="padding:10px 30px; color:#555; font-size:14px;">
        Use the OTP below to complete your verification. This code is valid for 5 minutes.
        </td>
    </tr>

    <tr>
        <td align="center" style="padding:20px;">
        <div style="display:inline-block; padding:15px 30px; font-size:28px; letter-spacing:5px; font-weight:bold; color:#ffffff; background:#4CAF50; border-radius:8px;">
            ${OTP}
        </div>
        </td>
    </tr>

    <tr>
        <td align="center" style="padding:20px; font-size:12px; color:#888;">
        If you didn’t request this, you can safely ignore this email.
        </td>
    </tr>

    <tr>
        <td align="center" style="padding-bottom:20px; font-size:12px; color:#aaa;">
        © 2026 Algolyx. All rights reserved.
        </td>
    </tr>

    </table>

</td>
</tr>
</table>

</body>
</html>`;
}
