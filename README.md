<a name="readme-top"></a>
# GAMES-LIST
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://i.imgur.com/EuB5bDl.png" alt="games-list" width="328" height="273">
  </a>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

<ul>
  <li><b>Dynamic Game Display</b>: Developed a responsive web application using React and Next.js to present game data from the API, providing an interactive and immersive experience to the users.</li>
  <li><b>Efficient Data Fetching</b>: Implemented efficient data fetching strategies to optimize loading times, resulting in seamless user navigation and reducing data transfer overhead. </li>
  <li><b>Search and Filtering</b>: Integrated a search and filtering system, enabling users to quickly find specific games based on game name, enhancing usability and user satisfaction.</li>
  <li><b>Infinite scroll for Results</b>:: Implemented dynamic pagination to handle a large volume of game data, ensuring smooth browsing and enhancing overall performance. </li>
  <li><b>Detailed Game Information</b>: Displayed comprehensive details for each game, including descriptions, ratings, platforms, and release dates, providing users with a comprehensive overview.</li>
</ul>

### Installation

1. Get a free API Key at [https://rawg.io/apidocs](https://rawg.io/apidocs)
2. Clone the repo
   ```sh
   git clone https://github.com/MetaX5/games-list.git
   ```
3. Install NPM packages

   ```sh
   npm install
   ```
   or
   <br />
   ```sh
   yarn install
   ```
   or
   <br />
   ```sh
   pnpm install
   ```
4. Enter your API in `.env.local` file in the root directory of the project.
   ```
   NEXT_PUBLIC_RAWG_API_KEY  = 'ENTER YOUR API';
   RAWG_API_KEY  = 'ENTER YOUR API';
   ```
5. Run project in dev mode
    ```sh
    npm run dev
    ```
    or build
    ```sh
    npm run build
    ```
    and deploy to [https://vercel.com/](https://vercel.com/)
<p align="right">(<a href="#readme-top">back to top</a>)</p>
