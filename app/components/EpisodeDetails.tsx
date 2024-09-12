import { Episode } from "../types";

interface EpisodeDetailsProps {
  episode: Episode;
}

export default function Episodes({ episode }: EpisodeDetailsProps) {
  const { id, name, episode: seasonEpisode } = episode;
  const numbers = seasonEpisode.match(/\d+/g);
  const numberArray = numbers?.map(Number);

  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{numberArray && numberArray.length > 0 ? numberArray[0] : "---"}</td>
      <td>{numberArray && numberArray.length > 1 ? numberArray[1] : "---"}</td>
    </tr>
  );
}
