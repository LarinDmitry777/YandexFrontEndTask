import style from './loadingComponent.module.css'

export default function Loading(): JSX.Element {
    return (
        <img className={style.loadAnimation}
             src={`/gifs/load.gif`}
             alt='' />
    )
}
