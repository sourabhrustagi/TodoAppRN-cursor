import { useState, useEffect, useCallback } from 'react';
import { dialogManager, DialogConfig, DialogState, DialogManager } from '../utils/dialogManager';

export const useDialogManager = () => {
  const [dialogs, setDialogs] = useState<Map<string, DialogState>>(new Map());

  useEffect(() => {
    // Subscribe to dialog changes
    const unsubscribe = dialogManager.subscribe((updatedDialogs) => {
      setDialogs(updatedDialogs);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const showDialog = useCallback((config: DialogConfig) => {
    dialogManager.showDialog(config);
  }, []);

  const hideDialog = useCallback((dialogId: string) => {
    dialogManager.hideDialog(dialogId);
  }, []);
 
  const hideAllDialogs = useCallback(() => {
    dialogManager.hideAllDialogs();
  }, []);

  const getDialog = useCallback((dialogId: string) => {
    return dialogManager.getDialog(dialogId);
  }, []);

  // Convenience methods for common dialogs
  const showDeleteTodoDialog = useCallback((
    todoText: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    const config = DialogManager.createDeleteTodoDialog(todoText, onConfirm, onCancel);
    showDialog(config);
  }, [showDialog]);

  const showClearAllTodosDialog = useCallback((
    todoCount: number,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    const config = DialogManager.createClearAllTodosDialog(todoCount, onConfirm, onCancel);
    showDialog(config);
  }, [showDialog]);

  const showConfirmActionDialog = useCallback((
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    options?: {
      confirmText?: string;
      cancelText?: string;
      destructive?: boolean;
    }
  ) => {
    const config = DialogManager.createConfirmActionDialog(title, message, onConfirm, onCancel, options);
    showDialog(config);
  }, [showDialog]);

  return {
    dialogs,
    showDialog,
    hideDialog,
    hideAllDialogs,
    getDialog,
    showDeleteTodoDialog,
    showClearAllTodosDialog,
    showConfirmActionDialog,
  };
};
