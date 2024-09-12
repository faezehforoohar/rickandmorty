import Image from "next/image";
import { Container, Row, Stack } from "react-bootstrap";
import Characters from "./components/Characters";
import Search from "./components/Search";
import { CharacterProvider } from "./context/CharacterContext";
import { EpisodeProvider } from "./context/EpisodeContext";

import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <EpisodeProvider>
        <CharacterProvider>
          <Container>
            <Row>
              <Stack
                direction="horizontal"
                className="align-items-end justify-content-between p-0"
              >
                <Image
                  src="/images/logo.png"
                  width={380}
                  height={95}
                  alt="Rick and Morty"
                  className="mb-4 mt-4"
                />
                <div className={styles.search}>
                  <Search />
                </div>
              </Stack>
            </Row>
            <Row>
              <Characters />
            </Row>
          </Container>
        </CharacterProvider>
      </EpisodeProvider>
    </div>
  );
}
