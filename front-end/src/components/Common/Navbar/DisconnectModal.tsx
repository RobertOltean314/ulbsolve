import React from "react";

interface DisconnectModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const DisconnectModal: React.FC<DisconnectModalProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal content */}
        <div className="relative transform overflow-hidden rounded-lg bg-[#162A4C] text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
          <div className="p-6">
            <h3 className="text-xl font-medium text-white mb-4">
              Disconnect Wallet
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to disconnect your wallet? You will need to
              reconnect to access your account.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
