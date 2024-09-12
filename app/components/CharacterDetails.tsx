import Image from "next/image";
import { Fragment } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import Loading from "./Loading";
import Episodes from "./Episodes";
import { Character } from "../types";
import { useEpisodeContext } from "../context/EpisodeContext";

import styles from "../page.module.css";

interface CharacterDetailsProps {
  character: Character;
}

export default function CharacterDetails({ character }: CharacterDetailsProps) {
  const { isLoading, toggleRows, isVisible } = useEpisodeContext();
  const {
    id,
    gender,
    status,
    name,
    species,
    origin,
    location,
    episode,
    image,
  } = character;

  return (
    <Fragment>
      <tr>
        <td>{id}</td>
        <td>
          <Button
            variant="dark"
            className="m-2"
            size="sm"
            onClick={() => toggleRows(character)}
          >
            {isVisible(id) ? (
              <CaretUpFill size={14} />
            ) : (
              <CaretDownFill size={14} />
            )}
          </Button>
          {name}
        </td>
        <td>{gender}</td>
        <td>{status}</td>
        <td>{species}</td>
        <td>{location.name}</td>
        <td>{episode.length}</td>
      </tr>
      {isVisible(id) && (
        <tr>
          <td colSpan={7}>
            <Card>
              <Card.Body>
                <Stack
                  direction="horizontal"
                  gap={3}
                  className="align-items-start"
                >
                  <Card className={styles.character}>
                    <Card.Body>
                      <Stack direction="horizontal" gap={3}>
                        <Image
                          alt={name}
                          src={image}
                          width={200}
                          height={200}
                        />
                        <div>
                          <Card.Title>{name}</Card.Title>
                          <Card.Text>
                            Gender:
                            <span className={styles.text}>{gender}</span>
                          </Card.Text>
                          <Card.Text>
                            Status:
                            <span className={styles.text}>{status}</span>
                          </Card.Text>
                          <Card.Text>
                            Species:
                            <span className={styles.text}>{species}</span>
                          </Card.Text>
                          <Card.Text>
                            Origin:
                            <span className={styles.text}>{origin.name}</span>
                          </Card.Text>
                          <Card.Text>
                            Location:
                            <span className={styles.text}>{location.name}</span>
                          </Card.Text>
                        </div>
                      </Stack>
                    </Card.Body>
                  </Card>
                  {episode && (
                    <div className={styles.episodes}>
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <Episodes episodes={episode} />
                      )}
                    </div>
                  )}
                </Stack>
              </Card.Body>
            </Card>
          </td>
        </tr>
      )}
    </Fragment>
  );
}
