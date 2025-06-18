// src/shared/lib/urlState.ts
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

/**
 * Хук для синхронизации состояния с query-параметрами URL.
 * T — тип объекта, где ключи — имена параметров, значения — строки.
 */
export function useUrlState<T extends Record<string, string>>() {
    const params = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const setState = (patch: Partial<T>) => {
        const newParams = new URLSearchParams(params.toString());
        // Применяем патч: добавляем или удаляем ключи
        Object.entries(patch).forEach(([key, value]) => {
            if (value == null || value === '') {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
        });
        // Навигируем на тот же путь с обновлённым query
        router.push(`${pathname}?${newParams.toString()}`);
    };

    // Возвращаем текущее состояние (Record<string,string>) и функцию обновления
    return {
        state: Object.fromEntries(params.entries()) as T,
        setState,
    };
}
