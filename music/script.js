async function loadSpotify() {
  const response = await fetch(
    "https://spotify-api-gray.vercel.app/api/spotify",
  );

  const data = await response.json();

  const container = document.querySelector(".content-about");

  container.innerHTML = `
         <a href="https://stats.fm/lnt" target="_blank">
            <p class="xp">My stats.fm account</p></a
          >

          <br />

          <a href="https://open.spotify.com/user/31svlfiwmavhyut6mnanagwikwpe" target="_blank">
          <p class="xp">My Spotify account</p></a
          >
          <br>
            <h5>Currently Listening</h5> <br>
            <div class="smth">
            ${
              data.current
                ? `

                    <img 
                        src="${data.current.album}"
                        alt="${data.current.song}"                                 style="width: 7vw;   border: #20c20e 0.2vw solid; padding: 1vw; margin-right: 2vw"

                    >
                        <a href="${data.current.url}" target="_blank"><p class="xp"> ${data.current.song} - ${data.current.artist}</p></a>

                `
                : `
                <p>Not listening right now</p>
                `
            }
</div>
<br>

            <h5>Recently Played</h5>
            <br>    

                ${data.history
                  .map(
                    (song) => `

                        
<div class="smth">
                            <img 
                                src="${song.album}"
                                alt="${song.song}"
                                style="width: 7vw;   border: #20c20e 0.2vw solid; padding: 1vw; margin-right: 2vw"


                            >
                                <a href="${song.url}" target="_blank"><p class="xp">${song.song} - ${song.artist}</p></a>
                            
                            
</div>
<br><br>
                    `,
                  )
                  .join("")}
 



    `;
}

loadSpotify();
