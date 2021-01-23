import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import superagent from 'superagent';
// import './styles.scss';
import { Editor } from '@tinymce/tinymce-react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { If, Else, Then } from 'react-if';

export default function SubmitPost() {
  const context = useContext(AuthContext);
  let history = useHistory();
  const [body, setBody] = useState('');
  const [comments, setComments] = useState([]);
  const API = 'https://osamapwc.herokuapp.com/comment';
  let url = window.location.href.split('/').pop();
  let blogID = url.split('&')[0];
  let authorID = url.split('&')[1].split('=').pop();
  console.log('lalallallalalala', blogID);
  console.log('authorID', authorID);

  const handleEditorChange = (content, editor) => {
    setBody(content);
  };

  const handleSubmit = () => {
    console.log(context.token);
    const payload = {
      body,
    };
    superagent
      .post(`${API}/${blogID}`)
      .set({ Authorization: `Basic ${context.token}` })
      .send(payload)
      .then((data) => {
        setComments([{ author: context.user.username, body }, ...comments]);
      });
  };
  useEffect(() => {
    async function getComments() {
      await superagent.get(`${API}/${blogID}`).then((data) => {
        console.log('osososoos', data);
        setComments([...data.body]);
        console.log('osososososso', data.body);
      });
    }
    getComments();
  }, []);

  return (
    <Container>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
          <h2 style={{ marginBottom: 0 }}>New Topic</h2>
        </Col>
      </Row>
      <If condition={context.loggedIn}>
        <Then>
          <Row className='flexCol' style={{ marginTop: '40px', justifyContent: 'center' }}>
            <Editor
              apiKey='vbaon8jny71c8uc0ebn1nn45htchbunbi6b9wp9v3e072trm'
              initialValue=''
              init={{
                height: 200,
                menubar: false,
                plugins: ['advlist autolink lists link image charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],
                toolbar:
                  // eslint-disable-next-line no-multi-str
                  'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
              }}
              onEditorChange={handleEditorChange}
            />

            <Button onClick={() => handleSubmit()} variant='outline-dark' className='buttonTopic' size='lg' type='submit' style={{ marginTop: '20px', height: '40px', fontWeight: '500' }}>
              Submit
            </Button>
          </Row>
        </Then>
      </If>

      <Row>
        {comments.map((item) => {
          return (
            <Col>
              <h2>{item.author}</h2>
              {console.log(item.body)}
              <p dangerouslySetInnerHTML={{ __html: item.body }}></p>
              <If condition={context.user.username == item.author}>
                <Then>
                  <Button>Edit</Button>
                </Then>
              </If>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
