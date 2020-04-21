interface AdventureApiData {
    id: number;
    name: string;
    adventureUrl: string;
    staticBasePath: string;
    imageName: string;
    description?: string;
    hashTags: IHashTag[];
    adventuresCount: number;
}

interface IHashTag {
    textRu: string;
    textEn: string;
}

class Adventure {
    private readonly app: App;

    constructor(app: App) {
        this.app = app;
    }

    private createWrapperWithLink(adventureData: AdventureApiData): HTMLElement {
        const wrapper = document.createElement('a');
        wrapper.href = `/quests/${adventureData.adventureUrl}/1`;

        return wrapper;
    }

    private createAdventureImage(adventureData: AdventureApiData): HTMLElement {
        const image = document.createElement('img');
        image.classList.add('adventure__image');
        image.src = `${adventureData.staticBasePath}images/adventures/${adventureData.imageName}`;
        image.alt = '';

        const wrapper = this.createWrapperWithLink(adventureData);
        wrapper.appendChild(image);

        return wrapper;
    }

    private createTitle(adventureData: AdventureApiData): HTMLElement {
        const title = document.createElement('h2');
        title.classList.add('adventure__title');
        title.innerText = adventureData.name;

        const wrapper = this.createWrapperWithLink(adventureData);
        wrapper.appendChild(title);

        return wrapper;
    }

    private createDescription(adventureData: AdventureApiData): HTMLElement | null {
        if (adventureData.description === undefined) {
            return null;
        }

        const description = document.createElement('div');
        description.classList.add('adventure__description');
        description.innerText = adventureData.description;

        return description;
    }

    private createAdventureHashTags(adventureData: AdventureApiData): HTMLElement {
        const hashTagContainer = document.createElement('div');
        hashTagContainer.classList.add('adventure__hash-tag-container');

        adventureData.hashTags.forEach(hashTagObject => {
            const hashTag = document.createElement('div');
            hashTag.classList.add('adventure__hash-tag');
            hashTag.innerText = `#${hashTagObject.textRu}`;
            hashTag.addEventListener('click', () => {this.app.hashTagHandler.call(this.app,
                hashTagObject.textRu)})

            hashTagContainer.appendChild(hashTag);
        });

        return hashTagContainer;
    }

    private createDescriptionColumn(adventureData: AdventureApiData): HTMLElement {
        const descriptionColumn = document.createElement('div');
        descriptionColumn.classList.add('adventure__description-column');
        descriptionColumn.appendChild(this.createTitle(adventureData));

        const description = this.createDescription(adventureData);
        if (description !== null) {
            descriptionColumn.appendChild(description);
        }

        descriptionColumn.appendChild(this.createAdventureHashTags(adventureData));

        return descriptionColumn;
    }

    renderAdventure(adventureData: AdventureApiData): void {
        const adventure = document.createElement('article');
        adventure.classList.add('adventure');
        adventure.appendChild(this.createAdventureImage(adventureData));
        adventure.appendChild(this.createDescriptionColumn(adventureData));

        const adventures = document.getElementsByClassName('adventures').item(0);
        if (adventures !== null) {
            adventures.appendChild(adventure);
        } else {
            console.error('Can`t found adventures class')
        }
    }
}
