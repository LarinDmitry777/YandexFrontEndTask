import React, {Component, Fragment} from 'react';
import {Header} from "../components/headerComponent";
import {Adventure, AdventureProps} from "../components/adventureComponent";
import Loading from "../components/loadingComponent";
import Head from "next/head";
// import {getDataFromQuery} from "../lib/util";
import {GetServerSideProps} from "next";
import config from 'config';

interface AdventuresPageProps {
    pageHashTagEn?: string;
    staticBasePath: string;
    adventuresInOnePack: number;
}

interface AdventuresPageState {
    adventures: AdventureProps[];
    loading: boolean;
    isAllAdventuresDownloaded: boolean;
    hashTagTextRu?: string;
}

export const getServerSideProps: GetServerSideProps = async context => {
    const result: { props: AdventuresPageProps} = {
        props: {
            staticBasePath: config.get('staticBasePath'),
            adventuresInOnePack: config.get('defaultAdventuresInPackCount')
        }
    }
    if (typeof context.query.hashTag === 'string') {
        result.props.pageHashTagEn = context.query.hashTag;
    }

    return result;
}

export default class IndexPage extends Component<AdventuresPageProps, AdventuresPageState> {
    private observer?: IntersectionObserver = undefined;

    state: AdventuresPageState = {
        adventures: [],
        loading: false,
        isAllAdventuresDownloaded: false
    };

    tryLoadHashTagTextRu(): void {
        const textEn = this.props.pageHashTagEn;
        if (textEn === undefined || textEn === '') {
            this.setState({hashTagTextRu: undefined});
            return;
        }
        const hostUrl = window.location.origin;
        const request = `${hostUrl}/api/getHashTagRuText/${textEn}`
        fetch(request)
            .then(result => result.ok ? result.text() : undefined)
            .then((hashTagTextRu: string | undefined) => this.setState({hashTagTextRu}));
    }

    loadAdventures(skip: number, count: number): void {
        this.disconnectObserver();
        this.setState({loading: true});
        const hostUrl = window.location.origin;
        const url = new URL(`${hostUrl}/api/adventures/`);
        url.searchParams.append('skip', skip.toString());
        url.searchParams.append('limit', count.toString());

        if (this.props.pageHashTagEn !== undefined && this.props.pageHashTagEn !== ''){
            url.searchParams.append('hashtag', this.props.pageHashTagEn);
        }
        fetch(url.toString())
            .then(
                (value): Promise<AdventureProps[]> => value.json()
            ).then(loadedAdventures => {
                let adventures = this.state.adventures?.slice();
                if (adventures === undefined) {
                    adventures = [];
                }
                adventures.push(...loadedAdventures);
                if (loadedAdventures.length < this.props.adventuresInOnePack) {
                    this.setState({ isAllAdventuresDownloaded: true });
                }
                this.setState({
                    adventures,
                    loading: false,
                });
                this.connectObserver();
            })
    }

    componentDidMount(): void {
       this.createObserver();
        this.tryLoadHashTagTextRu();
    }

    componentDidUpdate(prevProps: Readonly<AdventuresPageProps>): void {
        if (this.props.pageHashTagEn !== prevProps.pageHashTagEn) {
            this.setState({
                loading: false,
                isAllAdventuresDownloaded: false,
                adventures: []
            });
            this.tryLoadHashTagTextRu();
            this.loadAdventures(0, this.props.adventuresInOnePack);
        }
    }

    private createObserver(): void {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };

        const callback = (entries: IntersectionObserverEntry[]): void => {
            if (entries[0].isIntersecting) {
                this.loadAdventures(this.state.adventures.length, this.props.adventuresInOnePack);
            }
        }

        this.observer = new IntersectionObserver(callback, options);

        this.connectObserver();
    }

    private connectObserver(): void {
        const target = document.getElementsByClassName('observerElement').item(0);
        if (target !== null){
            this.observer?.observe(target);
        }
    }

    private disconnectObserver(): void {
        this.observer?.disconnect();
    }

    render() {
        const {adventures, isAllAdventuresDownloaded, loading} = this.state;

        return (
            <Fragment>
                <Head>
                    <title>{`TelltailGames 2 ${this.state.hashTagTextRu ? `| #${this.state.hashTagTextRu}` : ''}`}</title>
                </Head>
                <Header staticBasePath={'/'}/>
                {this.state.hashTagTextRu !== undefined
                    ? <h1 className='hash-tag'>#{this.state.hashTagTextRu}</h1>
                    : null }
                <section className="adventures">
                    {adventures.map(adventure => {
                        return (
                            <Adventure adventureUrl={adventure.adventureUrl}
                                       staticBasePath={adventure.staticBasePath}
                                       imageName={adventure.imageName}
                                       name={adventure.name}
                                       hashTags={adventure.hashTags}
                                       key={adventure.name}/>
                        )
                    })}
                </section>
                {loading ? <Loading /> : null}
                {!isAllAdventuresDownloaded ? <div className='observerElement' /> : null }
            </Fragment>
        )
    }
}
