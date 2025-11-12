declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        colorScheme: string;
        onEvent: (event: string, callback: () => void) => void;
        showAlert: (message: string) => void;
      };
    };
  }
}

export {};

