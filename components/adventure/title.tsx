import Link from "next/link";
import React from "react";
import style from "../adventureComponent.module.css";

interface TitleProps {
    adventureUrl: string;
    urlText: string;
    name: string;
    staticBasePath: string;
}

export default function Title(props: TitleProps): JSX.Element {
    const linkAs = `/quests/${props.urlText}/1`;
    const linkHref = {
        pathname: '/scene',
        query: {
            adventureName: props.adventureUrl,
            sceneId: 1,
            staticBasePath: props.staticBasePath
        }
    };

    return (
        <Link href={linkHref} as={linkAs}>
            <h2 className={style.adventure__title}>{props.name}</h2>
        </Link>
    )
}
