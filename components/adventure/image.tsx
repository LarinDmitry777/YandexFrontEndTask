import Link from "next/link";
import React from "react";

interface ImageProps {
    adventureUrl: string;
    urlText: string;
    staticBasePath: string;
    imageName: string;
}

export default function Image(props: ImageProps): JSX.Element {
    const linkAs = `/quests/${props.urlText}/1`;
    const linkHref = {
        pathname: '/scene',
        query: {
            adventureName: props.adventureUrl,
            sceneId: 1,
            staticBasePath: props.staticBasePath
        }
    };

    return(
        <Link href={linkHref} as={linkAs}>
        <img className="adventure__image" src={`${props.staticBasePath}images/adventures/${props.imageName}`} alt='' />
        </Link>
)
}
