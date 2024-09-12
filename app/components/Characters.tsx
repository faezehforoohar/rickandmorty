"use client";

import { Alert, Toast, Table } from "react-bootstrap";
import Pagination from "./Pagination";
import CharacterDetails from "./CharacterDetails";
import { Character } from "../types";
import { useCharacterContext } from "../context/CharacterContext";

import styles from "../page.module.css";

export default function Characters() {
  const { info, characters, currentPage, error, onClickPageHandler } =
    useCharacterContext();

  return (
    <>
      {error && (
        <div className={styles.alert}>
          <Alert variant="danger">
            <Toast.Body>{error?.message}</Toast.Body>
          </Alert>
        </div>
      )}
      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Species</th>
            <th>Location</th>
            <th>Episode</th>
          </tr>
        </thead>
        <tbody>
          {characters?.map((character: Character) => (
            <CharacterDetails key={character.id} character={character} />
          ))}
        </tbody>
      </Table>
      {info?.pages && (
        <Pagination
          pages={info?.pages}
          count={info.count}
          current={currentPage}
          onClick={onClickPageHandler}
        />
      )}
    </>
  );
}
