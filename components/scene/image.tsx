import React from "react";

interface ImageProps {
    imageName?: string;
    staticBasePath: string;
}

export default function Image(props: ImageProps): JSX.Element | null {
    if (props.imageName === null) {
        return null;
    }

    return (
        <img className="image"
             src={`${props.staticBasePath}images/scenes/${props.imageName}`}
             alt=""/>
    )
}
