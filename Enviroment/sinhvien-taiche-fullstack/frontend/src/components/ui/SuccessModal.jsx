import { useEffect, useState } from 'react';

export default function SuccessModal({ isOpen, onClose, title, message, verificationCode, verificationEmail, onResendEmail }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const copyCode = () => {
    if (verificationCode) {
      navigator.clipboard.writeText(verificationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-3xl px-6 pt-5 pb-6 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-8">
          <div>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-ecoGreen-100 text-ecoGreen-600 text-3xl">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-xl leading-6 font-bold text-gray-900" id="modal-title">
                {title || 'Đăng ký thành công!'}
              </h3>
              <div className="mt-3">
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {message || 'Cảm ơn bạn đã tham gia đồng hành cùng chúng tôi!'}
                </p>
              </div>
            </div>

            {/* Verification Code Section */}
            {verificationCode && (
              <div className="mt-5 space-y-4">
                {/* Email sent notification */}
                <div className="bg-ecoBlue-50 border border-ecoBlue-200 rounded-2xl p-4 flex items-start gap-3">
                  <div className="bg-ecoBlue-100 text-ecoBlue-600 p-2 rounded-xl flex-shrink-0 mt-0.5">
                    <i className="fa-solid fa-envelope-circle-check text-sm"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ecoBlue-800 uppercase tracking-wider">Email xác thực đã gửi</p>
                    <p className="text-xs text-ecoBlue-600 mt-0.5 font-medium break-all">
                      <i className="fa-regular fa-envelope mr-1"></i>{verificationEmail}
                    </p>
                  </div>
                </div>

                {/* Verification code display */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-2">Mã xác thực của bạn</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex gap-1.5">
                      {verificationCode.split('').map((digit, i) => (
                        <span key={i} className="w-10 h-12 bg-white border-2 border-ecoGreen-200 rounded-xl flex items-center justify-center text-xl font-extrabold text-gray-900 shadow-sm">
                          {digit}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={copyCode}
                      className="ml-2 p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-ecoGreen-600 hover:border-ecoGreen-300 transition-all"
                      title="Sao chép mã"
                    >
                      <i className={`fa-solid ${copied ? 'fa-check text-ecoGreen-600' : 'fa-copy'} text-sm`}></i>
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-center text-xs text-gray-400 space-y-1">
                  <p><i className="fa-solid fa-info-circle mr-1"></i>Vui lòng kiểm tra hộp thư (bao gồm cả Spam)</p>
                  {onResendEmail && (
                    <button onClick={onResendEmail} className="text-ecoGreen-600 hover:text-ecoGreen-700 font-bold underline underline-offset-2 transition-colors">
                      <i className="fa-solid fa-rotate-right mr-1"></i>Gửi lại email xác thực
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center w-full rounded-xl border border-transparent shadow-md px-4 py-3 bg-ecoGreen-600 text-base font-bold text-white hover:bg-ecoGreen-700 focus:outline-none transition-all duration-150"
            >
              Tuyệt vời, đóng lại nhé!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
