import React from "react";
import Link from "next/link";
import style from './headerComponent.module.css'

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
        <header className={style.header}>
            <Link as={linkAs} href={linkHref}>
                <img className={style.header__logo}
                     src={`/logo.svg`}
                     alt=''
                />
            </Link>
            <Link as={linkAs} href={linkHref}>
                <img className={style.header__companyName}
                     src={`/company-name.svg`}
                     alt=''
                />
            </Link>
        </header>
    )
}
