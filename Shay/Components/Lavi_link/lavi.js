const ARTIST = {
    name: 'Gustav Holst',
    blurb: 'Gustav Holst was an English composer, arranger and teacher. He is best known for his orchestral suite The Planets, which he composed between 1914 and 1917.',
    facts: [
      ['Born', '21 September 1874'],
      ['Died', '25 May 1934'],
    ]
};

const ArtistEl = document.getElementById('Artist');

ArtistEl.style.backgroundImage =  'linear-gradient(to bottom, #e9e4e400, #f0e9fd00),url(https://cdn.mos.cms.futurecdn.net/BfemybeKVXCf9pgX9WCxsc-1200-80.jpg)';  
ArtistEl.style.color = '#ffffff';  




ArtistEl.innerHTML = `
<div class="artist-card">
    <div class="artist-image">
        <img src="https://ehms.lib.umn.edu/wp-content/uploads/2021/05/Gustav-Holst.jpg" >
      
      </a>
    </div>
    <div class="artist-info">
        <h2>${ARTIST.name}</h2>
        <p>${ARTIST.blurb}</p>
        <ul>
          ${ARTIST.facts.map(([label, value]) => `<li><strong>${label}</strong> ${value}</li>`).join('')}
        </ul>
    </div>
</div>
`;