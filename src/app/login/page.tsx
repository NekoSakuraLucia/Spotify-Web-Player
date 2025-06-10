// Next
import { redirect } from 'next/navigation';

// Action
import { AccessToken } from '@/actions/CookiesAction';

// Component
import { Login as Page } from '@/components/Auth/Login';

async function LoginPage() {
    const token = await AccessToken();

    if (token) {
        redirect('/');
    }

    return <Page />;
}

export default LoginPage;
