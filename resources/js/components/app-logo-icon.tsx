import { SVGAttributes } from 'react';

export default function AppLogoIcon({ className }: { className?: string }) {
    return (
        <img
            src="/images/jolshirilogo.png" // or .svg
            alt="Jolshiri Logo"
            className={className}
        />
    );
}
