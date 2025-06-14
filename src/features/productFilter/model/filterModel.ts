'use client';

import { useState } from 'react';

export function useFilter(initial = '') {
    const [filter, setFilter] = useState<string>(initial);
    return { filter, setFilter };
}
