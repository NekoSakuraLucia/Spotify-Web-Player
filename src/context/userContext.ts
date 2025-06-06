// React
import { useContext } from 'react';

// Context
import { UserContext } from '@/context/userContextProvider';

// Type
import type { UserContextProvider } from '@/context/userContextProvider';

export const useGetUser = (): UserContextProvider => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useGetUser must be used within a UserProvider');
    }

    return context;
};
