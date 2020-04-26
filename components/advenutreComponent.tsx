import React from "react";
import {IHashTag} from "../server/dbAdapter";
import Link from "next/link";

export interface AdventureProps {
    adventureUrl: string;
    staticBasePath: string;
    imageName: string;
    name: string;
    description?: string;
    hashTags: IHashTag[];
}

interface ImageProps {
    adventureUrl: string;
    urlText: string;
    staticBasePath: string;
    imageName: string;
}

interface TitleProps {
    adventureUrl: string;
    urlText: string;
    name: string;
    staticBasePath: string;
}

interface DescriptionProps {
    description?: string;
}

interface HashTagsProps {
    hashTags: IHashTag[];
    staticBasePath: string;
}

export function Adventure(props: AdventureProps): JSX.Element {
    return (
        <article className='adventure'>
            <Image urlText={props.adventureUrl}
                   staticBasePath={props.staticBasePath}
                   imageName={props.imageName}
                   adventureUrl={props.adventureUrl}/>
            <div className="adventure__description-column">
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

function Image(props: ImageProps): JSX.Element {
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

function Title(props: TitleProps): JSX.Element {
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
            <h2 className="adventure__title">{props.name}</h2>
        </Link>
    )
}

function Description(props: DescriptionProps): JSX.Element | null {
    if (props.description === undefined) {
        return null;
    }

    return (
        <div className="adventure__description">{props.description}</div>
    )
}

function HashTags(props: HashTagsProps): JSX.Element {
    return (
        <div className="adventure__hash-tag-container">
            {props.hashTags.map(hashTag => {
                const linkAs = `/hashtags/${hashTag.textEn}`;
                const linkHref = {
                    pathname: '/list',
                    query: {
                        pageHashTagEn: hashTag.textEn,
                        staticBasePath: props.staticBasePath
                    }
                };
                return (
                    <Link href={linkHref} as={linkAs} key={hashTag.textEn}>
                        <div className='adventure__hash-tag'>
                            {`#${hashTag.textRu}`}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
