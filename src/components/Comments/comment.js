import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import superagent from 'superagent';
import { Editor } from '@tinymce/tinymce-react';
import { AuthContext } from '../../context/auth';
import { If, Else, Then } from 'react-if';

export default function SubmitPost() {
  const context = useContext(AuthContext);
  const [body, setBody] = useState('');
  const [comments, setComments] = useState([]);
  const API = 'https://osamapwc.herokuapp.com/comment';
  let url = window.location.href.split('/').pop();
  let blogID = url.split('&')[0];
  let authorID = url.split('&')[1].split('=').pop();
  const handleEditorChange = (content, editor) => {
    setBody(content);
  };

  const handleSubmit = () => {
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
        setComments([...data.body]);
      });
    }
    getComments();
  }, []);

  return (
    <Container>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col style={{ borderLeft: 'solid', height: '90%', borderRadius: '2px', borderLeftColor: '#504EDF', borderLeftWidth: '3px', paddingLeft: '8px' }}>
          <h2 style={{ marginBottom: 0, fontSize: '35px', color: 'blue' }}> Contents</h2>
        </Col>
      </Row>
      <If condition={context.loggedIn}>
        <Then>
          <Row style={{ marginTop: '40px', justifyContent: 'center', textAlign: 'center', width: '500px' }}>
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
            <Button onClick={() => handleSubmit()} variant='outline-dark' className='buttonTopic' size='lg' type='submit' style={{ marginTop: '20px', height: '40px', fontWeight: 'bold', backgroundColor: 'blue', color: 'white', fontSize: '25px' }}>
              Submit
            </Button>
          </Row>
        </Then>
      </If>

      <Row>
        {comments.map((item) => {
          return (
            <Col style={{ padding: '20px', marginRight: '100px' }}>
              <h2 style={{ color: 'blue' }}>{item.author}</h2>
              <p style={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: item.body }}></p>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
