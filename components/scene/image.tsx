import React from "react";
import style from "../sceneComponent.module.css";

interface ImageProps {
    imageName?: string;
    staticBasePath: string;
}

export default function Image(props: ImageProps): JSX.Element | null {
    if (props.imageName === null) {
        return null;
    }

    return (
        <img className={style.image}
             src={`${props.staticBasePath}images/scenes/${props.imageName}`}
             alt=""/>
    )
}
