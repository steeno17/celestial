const ARTIST = {
    name: 'Gustav Holst',
    blurb: 'Gustav Holst was an English composer, arranger, and teacher. He is best known for his orchestral suite "The Planets", which he composed between 1914 and 1917.',
    image: 'https://ehms.lib.umn.edu/wp-content/uploads/2021/05/Gustav-Holst.jpg',
    facts: [
        ['Born', '21 September 1874'],
        ['Died', '25 May 1934'],
        ['Era', '20th Century']
    ],
    // Island grid cards linked with customized descriptions and header titles
    cards: [
        {
            title: "The Planets Suite",
            description: "A seven-movement orchestral suite where each movement represents a planet and its corresponding astrological character.",
            tags: ["Orchestral", "Masterpiece", "1918"]
        },
        {
            title: "Mars, the Bringer of War",
            description: "Famous for its driving rhythm in 5/4 time signature and ominous brass fanfares.",
            tags: ["5/4 Time", "Iconic", "Brass"]
        },
        {
            title: "Jupiter, the Bringer of Jollity",
            description: "Features a majestic central hymn theme that later became the famous tune 'I Vow to Thee, My Country'.",
            tags: ["Hymn", "Melodic", "Popular"]
        },
        {
            title: "Influence & Legacy",
            description: "Holst's innovative use of rhythm and orchestration influenced generations of modern film composers, including John Williams.",
            tags: ["Legacy", "Film Scores", "Inspiration"]
        }
    ],
    blurb2: [
        {
            title: "The Blurb: Musical Philosophy & Legacy",
            description: "Holst's musical style was significantly influenced by the English folk song revival, sixteenth-century English madrigals, and the Sanskrit texts of ancient India. Unlike many of his contemporaries who leaned heavily into late-Romantic German traditions, Holst forged a distinct, sparse, and modal musical language. His deep fascination with astrology and spiritualism ultimately gave birth to 'The Planets', cementing his legacy as a pioneer of modern English orchestral writing.",
            tags: ["Biography", "Deep Dive", "Philosophy"]
        },
        {
          description:"Known primarily for The Planets, Gustav Holst also composed other music, played the trombone and taught at a girls school in London. His father taught him piano at an early age, but a nerve disease cut his career as a pianist short. He went on to attend the Royal College of Music where he studied composition and met fellow student Ralph Vaughn Williams, who became a lifelong friend."
        },
        {
          description: "Holst was very interested in Hindu literature and philosophy and even learned Sanskrit so that he could translate passages written in this language himself. This religion influences many of his works."
        },
        {
          description: "Because of his jobs as a trombonist and a teacher, Holst did most of his composing in his spare time. The success of The Planets thrust him suddenly into the spotlight, where he was not very comfortable. However, it also insured his financial well-being. Because of illness, Holst gave up teaching in 1925 and was able to spend the next several years writing music. His works include operas, choral music, orchestral pieces and songs"
        },
        {
          title:"BUT also add these or replace these if possible because I took them in consideration:",
          description:"Holst became fascinated with astrology in 1913, calling it his pet vice, and used the psychological and zodiacal characteristics of the planets (like Mars as the Bringer of War) to shape his music. This helped him bring forms of his own innovation in orchestral music through Astronomy helping him."
        },
        {
          description:"As a musical innovator, Holst's cosmic soundscapes later heavily influenced modern space-themed film scores and science fiction music - Star Wars and Star Trek being two big examples as an inspiration."
        },
    ]
};


// Render main Artist card
const artistEl = document.getElementById('Artist');

if (artistEl) {
    artistEl.innerHTML = `
        <div class="artist-card">
            <div class="artist-image">
                <img src="${ARTIST.image}" alt="${ARTIST.name}">
            </div>
            <div class="artist-info">
                <h2>${ARTIST.name}</h2>
                <p class="artist-blurb">${ARTIST.blurb}</p>
                <ul class="artist-facts">
                    ${ARTIST.facts.map(([label, value]) => `<li><strong>${label}:</strong> ${value}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Render dynamic Grid Cards inside the Island container
const islandContentEl = document.getElementById('island-content');

if (islandContentEl) {
    islandContentEl.innerHTML = ARTIST.cards.map(card => `
        <div class="grid-card">
            <div>
                <h3 class="card-header-title">${card.title}</h3>
                <p class="card-body-text">${card.description}</p>
            </div>
            <div class="card-footer-tags">
                ${card.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}


const blurbSectionEl = document.getElementById('blurb-section');
if (blurbSectionEl) {
    blurbSectionEl.innerHTML = ARTIST.blurb2.map(item => `
        <div class="blurb-item">
            ${item.title ? `<h3>${item.title}</h3>` : ''}
            <p>${item.description}</p>
        </div>
    `).join('');
}
                // <h3 class="card-header-title">${card.title}</h3>
           // <div class="card-footer-tags">
            //    ${card.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
           // </div>