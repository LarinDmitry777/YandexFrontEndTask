import {Achievement} from "../../pages/scene";
import React from "react";
import style from "../sceneComponent.module.css";

interface AchievementsProps {
    achievements: Achievement[];
    staticBasePath: string;
}

export default function Achievements(props: AchievementsProps): JSX.Element | null {
    if (props.achievements.length === 0) {
        return null;
    }

    return (
        <div className={style.achievementsList}>
            {props.achievements.map((achievement: Achievement) => {
                return (
                    <div className={style.achievement} key={achievement.id}>
                        <img className={style.achievement__image}
                             src={`${props.staticBasePath}images/achievements/${achievement.imageName}`}
                             alt=''
                        />
                        <div className={style.achievement__text}>Достижение получено</div>
                        <div className={style.achievement__name}>{achievement.text}</div>
                    </div>
                )
            })}
        </div>
    )
}
