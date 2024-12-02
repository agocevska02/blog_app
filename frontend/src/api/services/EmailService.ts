import { EmailDetails } from "../../types/Emails";
import { BlogAppClientInstance } from "../rest-client";

export class EmailService {
  sendEmail = async (emailDetails: EmailDetails) => {
    return await BlogAppClientInstance.post<string>(
      `email/sendMail`,
      emailDetails
    );
  };

  sendMailWithAttachment = async (emailDetails: EmailDetails) => {
    return await BlogAppClientInstance.post<string>(
      `email/sendMailWithAttachment`,
      emailDetails
    );
  };
}
