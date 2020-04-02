interface HashTag {
    textEn: string;
    textRu: string;
}

interface AdventureApiData {
    name: string;
    adventureUrl: string;
    staticBasePath: string;
    imageName: string;
    description?: string;
    hashTags: HashTag[];
}

function createWrapperWithLink(adventureData: AdventureApiData): HTMLElement {
    const wrapper = document.createElement('a');
    wrapper.href = `/quests/${adventureData.adventureUrl}/1`;

    return wrapper;
}

function createAdventureImage(adventureData: AdventureApiData): HTMLElement {
    const image = document.createElement('img');
    image.classList.add('adventure__image');
    image.src = `${adventureData.staticBasePath}images/adventures/${adventureData.imageName}`;
    image.alt = '';

    const wrapper = createWrapperWithLink(adventureData);
    wrapper.appendChild(image);

    return wrapper;
}

function createTitle(adventureData: AdventureApiData): HTMLElement {
    const title = document.createElement('h2');
    title.classList.add('adventure__title');
    title.innerText = adventureData.name;

    const wrapper = createWrapperWithLink(adventureData);
    wrapper.appendChild(title);

    return wrapper;
}

function createDescription(adventureData: AdventureApiData): HTMLElement | null {
    if (adventureData.description === undefined) {
        return null;
    }

    const description = document.createElement('div');
    description.classList.add('adventure__description');
    description.innerText = adventureData.description;

    return description;
}

function createHashTags(adventureData: AdventureApiData): HTMLElement {
    const hashTagContainer = document.createElement('div');
    hashTagContainer.classList.add('adventure__hash-tag-container');

    adventureData.hashTags.forEach(hashTagObject => {
        const hashTag = document.createElement('a');
        hashTag.classList.add('adventure__hash-tag');
        hashTag.href = `/hashtags/${hashTagObject.textEn}`;
        hashTag.innerText = `#${hashTagObject.textRu}`;

        hashTagContainer.appendChild(hashTag);
    });

    return hashTagContainer;
}

function createDescriptionColumn(adventureData: AdventureApiData): HTMLElement {
    const descriptionColumn = document.createElement('div');
    descriptionColumn.classList.add('adventure__description-column');
    descriptionColumn.appendChild(createTitle(adventureData));

    const description = createDescription(adventureData);
    if (description !== null) {
        descriptionColumn.appendChild(description);
    }

    descriptionColumn.appendChild(createHashTags(adventureData));

    return descriptionColumn;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function renderAdventure(adventureData: AdventureApiData): void {
    const adventure = document.createElement('article');
    adventure.classList.add('adventure');
    adventure.appendChild(createAdventureImage(adventureData));
    adventure.appendChild(createDescriptionColumn(adventureData));

    const adventures = document.getElementsByClassName('adventures').item(0);
    if (adventures !== null) {
        adventures.appendChild(adventure);
    } else {
        console.error('Can`t found adventures class')
    }
}

function renderAdventures(): void {
    fetch('http://localhost:3000/api/adventures')
        .then((value): Promise<AdventureApiData[]> => value.json())
        .then(adventures => {
            adventures.forEach(adventure => {renderAdventure(adventure)});
        });
}

renderAdventures();
