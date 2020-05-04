import React from "react";
import {IHashTag} from "../server/dbAdapter";
import Image from "./adventure/image";
import Title from "./adventure/title";
import Description from "./adventure/description";
import HashTags from "./adventure/hashTags";
import style from "./adventureComponent.module.css";

export interface AdventureProps {
    adventureUrl: string;
    staticBasePath: string;
    imageName: string;
    name: string;
    description?: string;
    hashTags: IHashTag[];
}

export function Adventure(props: AdventureProps): JSX.Element {
    return (
        <article className={style.adventure}>
            <Image urlText={props.adventureUrl}
                   staticBasePath={props.staticBasePath}
                   imageName={props.imageName}
                   adventureUrl={props.adventureUrl}/>
            <div className={style.adventure__descriptionColumn}>
                <Title urlText={props.adventureUrl}
                       name={props.name}
                       adventureUrl={props.adventureUrl}
                       staticBasePath={props.staticBasePath}/>
                <Description description={props.description}/>
                <HashTags hashTags={props.hashTags} staticBasePath={props.staticBasePath}/>
            </div>
        </article>
    )
}
