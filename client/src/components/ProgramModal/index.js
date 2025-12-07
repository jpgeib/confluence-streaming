import React from "react";
import { Image, Modal, Icon } from "semantic-ui-react";

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
                <Image src={program.Poster} alt={program.Title} className="modal-poster" />
                <Modal.Description>
                    <div className="program-modal">
                        <div className="program-modal-col">
                            <h3>Overview</h3>
                            <p>{program.Plot}</p>
                        </div>
                        <div className="program-modal-col">
                            <p><strong>Director:</strong> {program.Director}</p>
                            <p><strong>Cast:</strong> {program.Actors}</p>
                            <p><strong>Genre:</strong> {program.Genre}</p>
                            <p><strong>Rating:</strong> {program.Rated}</p>
                            <p><strong>Runtime:</strong> {program.Runtime}</p>
                            <p><strong>IMDb Rating:</strong> {program.imdbRating}/10</p>
                        </div>
                    </div>
                    <button className="program-modal-btn">
                        <Icon name="add" /> Add To Channel
                    </button>
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