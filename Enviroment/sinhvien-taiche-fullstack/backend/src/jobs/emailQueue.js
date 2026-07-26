/**
 * Email Queue (BullMQ/Redis ready)
 * Sends transactional emails asynchronously
 */

import logger from '../utils/logger.js';

/**
 * In-memory email queue (replace with BullMQ + Redis for production)
 */
class EmailQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  /**
   * Add email to queue
   */
  add(to, subject, body, options = {}) {
    this.queue.push({
      to,
      subject,
      body,
      options,
      createdAt: new Date(),
      retries: 0,
    });
    logger.debug(`Email queued to: ${to} - Subject: ${subject}`);
    
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  /**
   * Process queue
   */
  async processQueue() {
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const email = this.queue.shift();
      try {
        await this.sendEmail(email);
        logger.info(`Email sent to: ${email.to}`);
      } catch (error) {
        email.retries++;
        if (email.retries < 3) {
          logger.warn(`Email retry ${email.retries}/3 for: ${email.to}`);
          this.queue.push(email);
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, email.retries) * 1000));
        } else {
          logger.error(`Email failed after 3 retries to: ${email.to}`, error);
        }
      }
    }

    this.isProcessing = false;
  }

  /**
   * Send email (placeholder - integrate with SendGrid/Resend/AWS SES)
   */
  async sendEmail(email) {
    const { to, subject, body } = email;

    // TODO: Integrate with actual email provider
    // Example with SendGrid:
    // const msg = { to, from: 'noreply@svtaiche.edu.vn', subject, html: body };
    // await sgMail.send(msg);

    // Example with Resend:
    // await resend.emails.send({ from: 'SV Tái Chế <noreply@svtaiche.edu.vn>', to, subject, html: body });

    logger.info(`[EMAIL] To: ${to} | Subject: ${subject} | Length: ${body.length} chars`);
    
    // Simulate async send
    await new Promise(resolve => setTimeout(resolve, 100));
    return true;
  }
}

const emailQueue = new EmailQueue();

/**
 * Send welcome email after registration
 */
export const sendWelcomeEmail = (userEmail, userName) => {
  const subject = '🎉 Chào mừng bạn đến với SV Tái Chế!';
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #16a34a;">Chào mừng ${userName}!</h1>
      <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>SV Tái Chế - EcoValue Platform</strong>.</p>
      <p>Bạn có thể bắt đầu đặt lịch thu gom rác tái chế và tích lũy điểm EcoPoints ngay hôm nay!</p>
      <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;">🌱 <em>"Nhỏ bé nhưng kiên trì, từng vỏ chai đều có một tương lai mới."</em></p>
      </div>
      <a href="https://svtaiche.cmc.edu.vn" 
         style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 6px; font-weight: bold;">
        Khám phá ngay
      </a>
      <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="color: #6b7280; font-size: 12px;">
        SV Tái Chế - Dự án xã hội phi lợi nhuận | Trường Đại học CMC
      </p>
    </div>
  `;
  emailQueue.add(userEmail, subject, body);
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = (userEmail, resetToken) => {
  const subject = '🔐 Yêu cầu đặt lại mật khẩu - SV Tái Chế';
  const resetUrl = `https://svtaiche.cmc.edu.vn/reset-password?token=${resetToken}`;
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #16a34a;">Đặt lại mật khẩu</h1>
      <p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản <strong>${userEmail}</strong>.</p>
      <p>Vui lòng click vào link bên dưới để đặt lại mật khẩu. Link có hiệu lực trong 1 giờ:</p>
      <a href="${resetUrl}" 
         style="display: inline-block; background-color: #16a34a; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 6px; font-weight: bold;">
        Đặt lại mật khẩu
      </a>
      <p style="margin-top: 20px; color: #6b7280;">Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
      <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="color: #6b7280; font-size: 12px;">
        SV Tái Chế - Dự án xã hội phi lợi nhuận | Trường Đại học CMC
      </p>
    </div>
  `;
  emailQueue.add(userEmail, subject, body);
};

/**
 * Send schedule confirmation email
 */
export const sendScheduleConfirmationEmail = (userEmail, scheduleId) => {
  const subject = '📋 Xác nhận đặt lịch thu gom - SV Tái Chế';
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #16a34a;">Đặt lịch thành công!</h1>
      <p>Đơn thu gom rác của bạn đã được ghi nhận với mã số: <strong>${scheduleId}</strong></p>
      <p>Đội ngũ thu gom sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
      <p>Bạn có thể theo dõi trạng thái đơn hàng trong mục <strong>Lịch sử thu gom</strong>.</p>
      <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;" />
      <p style="color: #6b7280; font-size: 12px;">
        SV Tái Chế - Hành Động Xanh Vì Tương Lai
      </p>
    </div>
  `;
  emailQueue.add(userEmail, subject, body);
};

/**
 * Send OTP verification email
 */
export const sendOTPEmail = (userEmail, otpCode, purpose) => {
  const subject = `🔐 Mã xác thực OTP - SV Tái Chế`;
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🌱 SV Tái Chế</h1>
        <p style="color: #dcfce7; margin: 5px 0 0 0;">Xác thực tài khoản</p>
      </div>
      <div style="padding: 30px; background-color: #f9fafb;">
        <h2 style="color: #1f2937; font-size: 20px;">${purpose}</h2>
        <p style="color: #4b5563; line-height: 1.6;">Xin chào,</p>
        <p style="color: #4b5563; line-height: 1.6;">Mã xác thực OTP của bạn là:</p>
        <div style="text-align: center; margin: 25px 0;">
          <div style="display: inline-block; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); 
                      padding: 15px 40px; border-radius: 10px;">
            <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: white;">${otpCode}</span>
          </div>
        </div>
        <p style="color: #4b5563; line-height: 1.6;">Mã OTP có hiệu lực trong <strong>10 phút</strong>. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <p style="color: #92400e; margin: 0; font-size: 14px;">
            ⚠️ Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.
          </p>
        </div>
      </div>
      <div style="padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          SV Tái Chế - Dự án xã hội phi lợi nhuận | Trường Đại học CMC<br>
          © 2026 SV Tái Chế. All rights reserved.
        </p>
      </div>
    </div>
  `;
  emailQueue.add(userEmail, subject, body);
};

export default emailQueue;

