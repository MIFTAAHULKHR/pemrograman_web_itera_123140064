export class StorageManager {
    constructor(prefix = 'dashboardApp') {
        this.prefix = prefix;
    }

    setItem(key, value) {
        try {
            localStorage.setItem(`${this.prefix}_${key}`, JSON.stringify(value));
        } catch (e) {
            console.error("Gagal menyimpan ke localStorage:", e);
        }
    }

    getItem(key, defaultValue = []) {
        try {
            const value = localStorage.getItem(`${this.prefix}_${key}`);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error("Gagal membaca dari localStorage:", e);
            return defaultValue;
        }
    }
}
