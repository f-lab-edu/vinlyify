// import { useCurrentPlayingTrackLyrics } from '@/hooks/query/useCurrentPlayingTrackLyrics';
// import '@/style/music-info/album.scss';
// import classNames from 'classnames/bind';
// import Style from './lyrics.module.scss';

// export interface CurrentlyPlayingTrackLyrics {
//   term: string;
//   artist: string;
// }

// const style = classNames.bind(Style);

// const randomLengthsList = Array.from({ length: 6 }, () => (
//   <div className={style('wrap')}>
//     <div
//       className={style(
//         'skeleton',
//         'content',
//         `size${Math.floor(Math.random() * 10) % 5}`,
//       )}
//     ></div>
//   </div>
// ));

// const LyricsSkeleton = () => {
//   return (
//     <div className={style('lyrics-body')}>
//       <div className={style('skeleton', 'title')}></div>
//       <br />
//       <br />
//       {Array.from({ length: 6 }, (_, i) => (
//         <div key={i} className={style('verse-wrap')}>
//           {randomLengthsList}
//         </div>
//       ))}
//     </div>
//   );
// };

// const Lyrics = ({ term, artist }: CurrentlyPlayingTrackLyrics) => {
//   const { data, isLoading } = useCurrentPlayingTrackLyrics({ term, artist });
//   // const { data } = useCurrentPlayingTrack();

//   return (
//     <>
//       {term}
//       {artist}
//       <div>{JSON.stringify(data)}</div>
//       {/* <div
//         id="rg_embed_link_2953763"
//         class="rg_embed_link"
//         data-song-id="2953763"
//       >
//         Read{' '}
//         <a href="https://genius.com/Ed-sheeran-galway-girl-lyrics">
//           “Galway Girl” by Ed Sheeran
//         </a>{' '}
//         on Genius
//       </div>{' '}
//       <div>
//         <h3>Galway Girl - Ed Sheeran</h3>
//         <div id="rg_embed_link_2953763" data-song-id="2953763">
//           Read{' '}
//           <a href="https://genius.com/Ed-sheeran-galway-girl-lyrics">
//             “Galway Girl” by Ed Sheeran
//           </a>{' '}
//           on Genius
//         </div>
//       </div> */}
//       {/* <script src="//genius.com/songs/2953763/embed.js"></script> */}
//     </>
//   );

//   // if (isLoading) return <LyricsSkeleton />;
//   // if (!data?.result)
//   //   return <NothingToShow message={`"${term}"에 해당하는 가사가 없습니다.`} />;
//   // return (
//   //   <>
//   //     <div className={style('lyrics-body')}>
//   //       {data?.result}
//   //       <div className={style('lyrics-credit')}>lyrics from Genius</div>
//   //     </div>
//   //   </>
//   // );
// };
// export default Lyrics;
