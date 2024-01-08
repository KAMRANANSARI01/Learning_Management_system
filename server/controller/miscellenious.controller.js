import { sendEmail } from "../utils/sendEmail.utils.js";
import AppError from "../utils/error.utils.js";

// making contactUs form server

const contactUs = async (req, res, next) => {
//       const { name, email, message } = req.body;

//   // adding validation
//   if (!name || !email || !message) {
//     return next(new AppError("All feilds are mandatory", 400));
//   }

//   try {
//     const subject = "Contact Us Form";
//     const message = `${name} - ${email} <br /> ${message}`;
//     await sendEmail(process.env.CONTACT_US_MAIL, subject, message);
//   } catch (error) {
//     console.log(error);
//     return next(new AppError(error.message, 400));
//   }

//   res.status(200).json({
//     success : true,
//     message : "Your Message has been submitted successfully!"
//   })

  // Destructuring the required data from req.body
  const { name, email, message } = req.body;

  // Checking if values are valid
  if (!name || !email || !message) {
    return next(new AppError('Name, Email, Message are required'));
  }

  try {
    const subject = 'Contact Us Form';
    const textMessage = `${name} - ${email} <br /> ${message}`;

    // Await the send email
    await sendEmail(process.env.CONTACT_US_MAIL, subject, textMessage);
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 400));
  }

  res.status(200).json({
    success: true,
    message: 'Your request has been submitted successfully',
  });
};

export {
    contactUs
}


