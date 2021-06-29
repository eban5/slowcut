import '../styles/StackedCards.css';
import { useFetchPopularMovies } from '../hooks/useFetch';
import { buildPosterPath } from '../utils/api';

// interface StackedCardsProps {
// 	keyword?: string;
// }

const StackedCards = () => {
  const { status, data } = useFetchPopularMovies(6);
  const stackedCards = data.slice(0, 6);

  return (
    <>
      {status === 'fetching' ? (
        <div className="white">Loading...</div>
      ) : (
        <>
          <div className="parent">
            {stackedCards.map((item: any, idx: any) => {
              if (!item) {
                return;
              }
              if (item) {
                // TODO convert to Poster component with Link
                return (
                  <div key={idx} className={`child child${idx}`}>
                    <img
                      className=""
                      alt={`${item.title} (${item.release_date.substr(0, 4)})`}
                      src={buildPosterPath(item.poster_path, `w154`)}
                    />
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </>
  );
};

export default StackedCards;
