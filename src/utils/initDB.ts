export const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('SlidesDB', 1);

        request.onupgradeneeded = (event) => {
            const db = request.result;
            if (!db.objectStoreNames.contains('slides')) {
                db.createObjectStore('slides', { keyPath: 'id' }); // Для хранения слайдов
            }
            if (!db.objectStoreNames.contains('currentSlide')) {
                db.createObjectStore('currentSlide', { keyPath: 'id' }); // Для текущего слайда
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const saveToDB = (db: IDBDatabase, storeName: string, data: any): Promise<void> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        if (Array.isArray(data)) {
            data.forEach((item) => store.put(item));
        } else {
            store.put(data);
            console.log({ store });
        }

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
};

export const loadFromDB = (db: IDBDatabase, storeName: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const deleteFromDB = (db: IDBDatabase, storeName: string, key: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        try {
            const request = store.delete(key); // Удаляем запись по ключу

            request.onsuccess = () => {
                console.log(`Successfully deleted item with key "${key}" from "${storeName}"`);
                resolve();
            };
            request.onerror = () => {
                console.error(`Failed to delete item with key "${key}" from "${storeName}"`);
                reject(request.error);
            };
        } catch (error) {
            console.error('Error during delete operation:', error);
            reject(error);
        }
    });
};

export const clearDB = (db: IDBDatabase, storeName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);

            const clearRequest = store.clear();

            clearRequest.onsuccess = () => {
                console.log(`Successfully cleared store "${storeName}".`);
                resolve();
            };

            clearRequest.onerror = () => {
                console.error(`Failed to clear store "${storeName}".`, clearRequest.error);
                reject(clearRequest.error);
            };
        } catch (error) {
            console.error(`Error while clearing store "${storeName}".`, error);
            reject(error);
        }
    });
};
