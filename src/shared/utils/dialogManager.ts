import { logger } from './logger';

export interface DialogConfig {
  id: string;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface DialogState {
  visible: boolean;
  config: DialogConfig | null;
}

class DialogManager {
  private dialogs: Map<string, DialogState> = new Map();
  private listeners: Set<(dialogs: Map<string, DialogState>) => void> = new Set();

  /**
   * Show a dialog with the given configuration
   */
  showDialog(config: DialogConfig): void {
    logger.info(`[DialogManager] Showing dialog: ${config.id}`);
    
    this.dialogs.set(config.id, {
      visible: true,
      config: {
        ...config,
        onCancel: config.onCancel || this.createDefaultCancelHandler(config.id)
      }
    });
    
    this.notifyListeners();
  }

  /**
   * Hide a specific dialog
   */
  hideDialog(dialogId: string): void {
    logger.info(`[DialogManager] Hiding dialog: ${dialogId}`);
    
    const dialog = this.dialogs.get(dialogId);
    if (dialog) {
      dialog.visible = false;
      this.notifyListeners();
    }
  }

  /**
   * Hide all dialogs
   */
  hideAllDialogs(): void {
    logger.info('[DialogManager] Hiding all dialogs');
    
    this.dialogs.forEach((dialog) => {
      dialog.visible = false;
    });
    
    this.notifyListeners();
  }

  /**
   * Get dialog state by ID
   */
  getDialog(dialogId: string): DialogState | undefined {
    return this.dialogs.get(dialogId);
  }

  /**
   * Get all active dialogs
   */
  getAllDialogs(): Map<string, DialogState> {
    return new Map(this.dialogs);
  }

  /**
   * Subscribe to dialog changes
   */
  subscribe(listener: (dialogs: Map<string, DialogState>) => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Create a default cancel handler
   */
  private createDefaultCancelHandler(dialogId: string): () => void {
    return () => {
      logger.info(`[DialogManager] Default cancel handler for dialog: ${dialogId}`);
      this.hideDialog(dialogId);
    };
  }

  /**
   * Notify all listeners of changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      listener(new Map(this.dialogs));
    });
  }

  /**
   * Predefined dialog configurations for common use cases
   */
  static createDeleteTodoDialog(
    todoText: string,
    onConfirm: () => void,
    onCancel?: () => void
  ): DialogConfig {
    return {
      id: 'delete-todo',
      title: 'Delete Todo',
      message: `Are you sure you want to delete "${todoText}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmButtonColor: '#FF3B30',
      cancelButtonColor: '#8E8E93',
      destructive: true,
      onConfirm,
      onCancel
    };
  }

  static createClearAllTodosDialog(
    todoCount: number,
    onConfirm: () => void,
    onCancel?: () => void
  ): DialogConfig {
    return {
      id: 'clear-all-todos',
      title: 'Clear All Todos',
      message: `Are you sure you want to delete all ${todoCount} todos? This action cannot be undone.`,
      confirmText: 'Clear All',
      cancelText: 'Cancel',
      confirmButtonColor: '#FF3B30',
      cancelButtonColor: '#8E8E93',
      destructive: true,
      onConfirm,
      onCancel
    };
  }

  static createConfirmActionDialog(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    options?: {
      confirmText?: string;
      cancelText?: string;
      destructive?: boolean;
    }
  ): DialogConfig {
    return {
      id: `confirm-action-${Date.now()}`, // Unique ID for each confirmation
      title,
      message,
      confirmText: options?.confirmText || 'Confirm',
      cancelText: options?.cancelText || 'Cancel',
      confirmButtonColor: options?.destructive ? '#FF3B30' : '#007AFF',
      cancelButtonColor: '#8E8E93',
      destructive: options?.destructive || false,
      onConfirm,
      onCancel
    };
  }
}

// Export singleton instance
export const dialogManager = new DialogManager();
export { DialogManager };
export default dialogManager;
