import React from "react";
import { Modal, Icon, Grid } from "semantic-ui-react";

import "./style.css";

const ProgramModal = ({ program, open, onClose }) => {

    if (!program) return null;

    return (
        <Modal
            onClose={onClose}
            open={open}
            size="large"
        >
            <Modal.Header>{program.Title} ({program.Year})</Modal.Header>
            <Modal.Content image>
                <img src={program.Poster} alt={program.Title} className="modal-poster" />
                <Modal.Description>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <h3>Overview</h3>
                                <p>{program.Plot}</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <p><strong>Director:</strong> {program.Director}</p>
                                <p><strong>Cast:</strong> {program.Actors}</p>
                                <p><strong>Genre:</strong> {program.Genre}</p>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <p><strong>Rating:</strong> {program.Rated}</p>
                                <p><strong>Runtime:</strong> {program.Runtime}</p>
                                <p><strong>IMDb Rating:</strong> {program.imdbRating}/10</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <button className="modal-close-btn" onClick={onClose}>
                    Close
                </button>
            </Modal.Actions>
        </Modal>
    );
};

export default ProgramModal;