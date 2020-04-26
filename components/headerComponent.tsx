import React from "react";
import Link from "next/link";

interface HeaderProps {
    staticBasePath: string;
}

export function Header(props: HeaderProps): JSX.Element {
    const linkAs = '/';
    const linkHref = {
        pathname: '/list',
        query: {
            staticBasePath: props.staticBasePath
        }
    };

    return (
        <header className='header'>
            <Link as={linkAs} href={linkHref}>
                <img className='header__logo'
                     src={`/logo.svg`}
                     alt=''
                />
            </Link>
            <Link as={linkAs} href={linkHref}>
                <img className='header__company-name'
                     src={`/company-name.svg`}
                     alt=''
                />
            </Link>
        </header>
    )
}
