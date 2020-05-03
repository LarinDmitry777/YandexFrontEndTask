import React from "react";
import {SceneProps} from "../pages/scene";
import TextContent from "./scene/textContent";
import Achievements from "./scene/achievements";
import Actions from "./scene/actions";
import Image from "./scene/image";
import style from "./sceneComponent.module.css";


export default function Scene(props: SceneProps): JSX.Element {
    return (
        <section className={style.content}>
            <TextContent isHasImage={props.imageName !== null}
                         text={props.text}
                         textPosition={props.textPosition}/>
            <Image staticBasePath={props.staticBasePath}
                   imageName={props.imageName}/>
            <Achievements achievements={props.achievements} staticBasePath={props.staticBasePath}/>
            <Actions actions={props.actions} adventureUrl={props.adventureUrl} staticBasePath={props.staticBasePath} />
        </section>

    )
}
