import React, { useEffect, useState } from "react";
import MainScreen from "../../react/components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../redux/forum/noteActions";

import ReactMarkdown from "react-markdown";

function CreateNote({ history }) {
  const [forumName, setforumName] = useState("");
  const [forumDescription, setforumDescription] = useState("");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { note } = noteCreate;

  const resetHandler = () => {
    setforumName("");
    setforumDescription("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(forumName, forumDescription));
    if (!forumName || !forumDescription) return;

    resetHandler();
    history.push("/notesMe");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="forumName">
              <Form.Label>forumName</Form.Label>
              <Form.Control
                type="title"
                value={forumName}
                placeholder="Enter the forumName"
                onChange={(e) => setforumName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="forumDescription">
              <Form.Label>forumDescription</Form.Label>
              <Form.Control
                as="textarea"
                value={forumDescription}
                placeholder="Enter the forumDescription"
                rows={4}
                onChange={(e) => setforumDescription(e.target.value)}
              />
            </Form.Group>
            {forumDescription && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{forumDescription}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
