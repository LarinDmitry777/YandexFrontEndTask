import Link from "next/link";
import {Action} from "../../pages/scene";
import React from "react";
import style from "../sceneComponent.module.css";

interface ActionsProps {
    staticBasePath: string;
    actions: Action[];
    adventureUrl: string;
}

export default function Actions(props: ActionsProps) {
    if (props.actions.length === 0) {
        const linkAs = `/quests/${props.adventureUrl}/1`;
        const linkHref = {
            pathname: '/scene',
            query: {adventureName: props.adventureUrl, sceneId: '1', staticBasePath: props.staticBasePath}
        }

        return (
            <div className={style.actionList}>
                <Link as={linkAs} href={linkHref}>
                    <div className={style.actionList__action}>
                        Начать заново
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <div className={style.actionList}>
            {props.actions.map((action: Action) => {
                const linkAs = `/quests/${props.adventureUrl}/${action.nextSceneId}`;
                const linkHref = {
                    pathname: '/scene',
                    query: {
                        adventureName: action.adventureUrl,
                        sceneId: action.nextSceneId.toString(),
                        staticBasePath: props.staticBasePath
                    }
                }

                return (
                    <Link href={linkHref} as={linkAs} key={action.id}>
                        <div className={style.actionList__action}>
                            {action.text}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
