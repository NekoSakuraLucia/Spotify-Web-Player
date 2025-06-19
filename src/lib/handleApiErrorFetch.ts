// Toastify
import { toast } from 'react-toastify';

// Function
async function handleApiErrorFetch(
    fn: () => Promise<boolean>,
    label: string,
): Promise<void> {
    const isSuccess = await fn();
    if (!isSuccess) {
        toast.error(label);
    }
}

export { handleApiErrorFetch };
