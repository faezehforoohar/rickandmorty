import { Table } from "react-bootstrap";
import EpisodeDetails from "./EpisodeDetails";
import { useEpisodeContext } from "../context/EpisodeContext";

interface EpisodesProps {
  episodes: string[];
}

export default function Episodes({ episodes }: EpisodesProps) {
  const { episodesData } = useEpisodeContext();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Season</th>
          <th>Episode</th>
        </tr>
      </thead>
      <tbody>
        {episodes.map((episode) => {
          let findEpisode = episodesData?.find((item) => item.url === episode);
          if (findEpisode) {
            return <EpisodeDetails episode={findEpisode} />;
          }
        })}
      </tbody>
    </Table>
  );
}
