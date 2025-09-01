import React from 'react';
import { useDialogManager } from '../hooks/useDialogManager';
import ConfirmationDialog from './ConfirmationDialog';

export const DialogContainer: React.FC = () => {
  const { dialogs, hideDialog } = useDialogManager();

  const handleConfirm = (dialogId: string, onConfirm: () => void) => {
    onConfirm();
    hideDialog(dialogId);
  };

  const handleCancel = (dialogId: string, onCancel?: () => void) => {
    if (onCancel) {
      onCancel();
    }
    hideDialog(dialogId);
  };

  return (
    <>
      {Array.from(dialogs.entries()).map(([dialogId, dialogState]) => {
        if (!dialogState.visible || !dialogState.config) {
          return null;
        }

        const { config } = dialogState;

        return (
          <ConfirmationDialog
            key={dialogId}
            visible={dialogState.visible}
            title={config.title}
            message={config.message}
            confirmText={config.confirmText}
            cancelText={config.cancelText}
            confirmButtonColor={config.confirmButtonColor}
            cancelButtonColor={config.cancelButtonColor}
            onConfirm={() => handleConfirm(dialogId, config.onConfirm)}
            onCancel={() => handleCancel(dialogId, config.onCancel)}
          />
        );
      })}
    </>
  );
};

export default DialogContainer;
