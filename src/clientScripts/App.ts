class App {
    constructor() {
        window.onpopstate = (event: PopStateEvent) => {
            const historyHashTag = event.state === null ? '' : event.state.pageHashTag;
            this.loadPageWiaHashTag(historyHashTag, false);
        }

        this.createLoadingAnimation();
        this.createObserver();

        if (this.pageHashTagRu !== undefined) {
            this.updateWindowTitle(this.pageHashTagRu);
        }
    }

    hostUrl = window.location.origin;
    skipAdventureCountParam = 0;
    observer: IntersectionObserver | undefined;
    adventuresInOnePack = 5;
    pageHashTagRu = document
        .getElementsByClassName('hash-tag')
        .item(0)
        ?.textContent
        ?.slice(1);
    pageHashTagEn: string | undefined = undefined;
    adventureGenerator = new Adventure(this);


    private removeLoadingAmination(): void {
        document.getElementsByClassName('load-animation').item(0)?.remove();
    }

    private updateWindowTitle(hashTagRu: string): void {
        if (hashTagRu === '') {
            document.title = 'TellTailGames2';
        } else {
            document.title = `TellTailGames2 | #${hashTagRu}`;
        }
    }

    private createLoadingAnimation(): void {
        this.removeLoadingAmination();
        const loadingAnimation = document.createElement('img');
        loadingAnimation.src = `https://tall-tale-cdn.surge.sh/gifs/load.gif`
        loadingAnimation.alt = ''
        loadingAnimation.className = 'load-animation'

        const body = document.getElementsByTagName('body').item(0);
        body?.appendChild(loadingAnimation);
    }

    private removeAdventuresFromPage(): void {
        document.getElementsByClassName('adventures').item(0)?.remove();
        const adventures = document.createElement('section');
        adventures.classList.add('adventures');

        this.removeLoadingAmination();
        document.getElementsByTagName('body')
            .item(0)
            ?.appendChild(adventures);
        this.createLoadingAnimation();
    }

    private updatePageHashTag(textRu: string): Promise<void> {
        this.pageHashTagRu = textRu;

        const hashTagElement = document.getElementsByClassName('hash-tag').item(0);

        if (hashTagElement !== null) {
            if (this.pageHashTagRu !== '') {
                hashTagElement.textContent = `#${textRu}`;
                hashTagElement.classList
                    ?.remove('hash-tag_hidden');
            } else {
                hashTagElement.textContent = '';
                hashTagElement.classList
                    ?.add('hash-tag_hidden');
            }
        }

        const hashTagEnRequest = `${this.hostUrl}/api/getHashTagEnText/${this.pageHashTagRu}`;

        return fetch(hashTagEnRequest)
            .then(res => {
                if (res.ok) {
                    return res.text();
                } else {
                    return '';
                }
            })
            .then((hashTagEn: string) => {
                this.pageHashTagEn = hashTagEn
            });
    }

    private addPageToHistory(): void {
        const state = { pageHashTag: this.pageHashTagRu };
        const title = `${document.title}`;
        const url = this.pageHashTagRu === '' ? '/' : `/hashTags/${this.pageHashTagEn}`;

        history.pushState(state, title, url);
    }

    private connectObserver(): void {
        const target = document.getElementsByClassName('load-animation').item(0);
        if (target !== null){
            this.observer?.observe(target);
        }
    }

    private disconnectObserver(): void {
        this.observer?.disconnect();
    }

    private loadPageWiaHashTag(hashTagRu: string, isWantAddToHistory: boolean): void {
        if (hashTagRu !== this.pageHashTagRu) {
            this.updateWindowTitle(hashTagRu);
            this.disconnectObserver();
            this.removeAdventuresFromPage();
            this.updatePageHashTag(hashTagRu)
                .then(() => {
                    this.skipAdventureCountParam = 0;
                    this.connectObserver();
                    if (isWantAddToHistory) {
                        this.addPageToHistory();
                    }
                });
        }
    }

    hashTagHandler(hashTagRu: string): void {
        this.loadPageWiaHashTag(hashTagRu, true);
    }

    private loadAdventuresPack(tryNumber = 0): void {
        this.disconnectObserver();

        const url = new URL(`${this.hostUrl}/api/adventures/`);
        url.searchParams.append('skip', this.skipAdventureCountParam.toString());
        url.searchParams.append('limit', this.adventuresInOnePack.toString());
        if (this.pageHashTagEn !== undefined && this.pageHashTagEn !== ''){
            url.searchParams.append('hashtag', this.pageHashTagEn);
        }

        fetch(url.toString())
            .then(
                (value): Promise<AdventureApiData[]> => value.json()
            ).then(adventures => {
            adventures.forEach(adventure => {
                this.adventureGenerator.renderAdventure(adventure)
            });
            this.skipAdventureCountParam += adventures.length;
            this.removeLoadingAmination();
            if (adventures.length === this.adventuresInOnePack ) {
                this.createLoadingAnimation();
                this.connectObserver();
            }
        })
            .catch(e => {
                const maxTryCount = 3;
                if (tryNumber < maxTryCount) {
                    console.log(tryNumber);
                    setTimeout(this.loadAdventuresPack.bind(this, tryNumber + 1), 1000 * tryNumber);
                } else {
                    console.error(e)
                    this.disconnectObserver();
                    this.removeLoadingAmination();
                    alert('Произошла ошибка. Попробуйте перезагрузить страницу.')
                }

            });
    }

    private createObserver(): void {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };

        const callback = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].isIntersecting) {
                this.createLoadingAnimation()
                this.loadAdventuresPack();
            }
        }

        this.observer = new IntersectionObserver(callback, options);

        this.connectObserver();
    }

}
