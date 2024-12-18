// src/utils/sessionStorage.ts

export const sessionStorageAPI = {
    setItem<T>(key: string, value: T): void {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    
    getItem<T>(key: string): T | null {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
    
    updateItem<T>(key: string, value: Partial<T>): void {
      const existingValue = this.getItem<T>(key);
      if (existingValue !== null) { // Only update if existingValue is not null
        // If existingValue is an object, merge it with the new value
        if (typeof existingValue === 'object' && existingValue !== null) {
          const updatedValue = { ...existingValue, ...value };
          this.setItem(key, updatedValue);
        } else {
          // If existingValue is not an object, just set the new value
          this.setItem(key, value);
        }
      }
      // If existingValue is null, do nothing (do not set the new value)
    },
    
    removeItem(key: string): void {
      sessionStorage.removeItem(key);
    },
    
    clear(): void {
      sessionStorage.clear();
    }
  };