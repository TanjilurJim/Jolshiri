import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to access your Jolshiri CRM"
        >
            <Head title="Log in" />
            
            <form className="flex flex-col gap-6 bg-card p-6 rounded-xl border border-border shadow-lg" onSubmit={submit}>
                {/* Status message */}
                {status && (
                    <div className="rounded-md bg-accent/20 p-3 text-center text-sm font-medium text-accent-foreground">
                        {status}
                    </div>
                )}
                
                <div className="grid gap-6">
                    {/* Email field */}
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-foreground">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="you@example.com"
                            className="bg-input text-foreground focus:ring-2 focus:ring-primary"
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* Password field */}
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-foreground">Password</Label>
                            {canResetPassword && (
                                <TextLink 
                                    href={route('password.request')} 
                                    className="text-sm text-sky-blue hover:text-deep-teal transition-colors"
                                    tabIndex={5}
                                >
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className="bg-input text-foreground focus:ring-2 focus:ring-primary"
                        />
                        <InputError message={errors.password} />
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                            className="border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                        <Label htmlFor="remember" className="text-foreground">Remember me</Label>
                    </div>

                    {/* Submit button */}
                    <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition duration-200 shadow-md"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Log in'}
                    </Button>
                </div>

                {/* Sign up link */}
                <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <TextLink 
                        href={route('register')} 
                        className="text-[#2ab1b0] hover:text-primary transition-colors font-bold"
                        tabIndex={5}
                    >
                        Sign up
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
