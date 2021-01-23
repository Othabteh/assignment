import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import { Container, Row, Card } from 'react-bootstrap';
import Comments from '../Comments/comment';
import { Editor } from '@tinymce/tinymce-react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../context/auth';
import { If, Then, Else } from 'react-if';
const blogsApi = 'https://osamapwc.herokuapp.com/post';

export default function HomePage() {
  const context = useContext(AuthContext);
  const API = 'https://osamapwc.herokuapp.com/blog';
  const [blog, setBlog] = useState({});
  const [edit, setEdit] = useState(false);
  const [body, setBody] = useState('');
  const [blogID, setBlogID] = useState('');
  const handleEditorChange = (content, editor) => {
    setBody(content);
  };

  const handleSubmit = () => {
    const payload = {
      body,
    };
    superagent
      .patch(`${API}/${blogID}`)
      .set({ Authorization: `Basic ${context.token}` })
      .send(payload)
      .then((data) => {
        setBlog({ ...blog, body });
        setEdit(false);
      });
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    let url = window.location.href.split('/').pop();
    let blogID = url.split('&')[0];
    setBlogID(blogID);

    async function getData() {
      await superagent.get(`${blogsApi}/${blogID}`).then((data) => {
        setBlog(data.body[0]);
      });
    }

    getData();
  }, []);
  return (
    <>
      <Container style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '100px' }}>
        <If condition={!edit}>
          <Then>
            <Card.Body style={{ margin: '0 auto', width: '18rem', height: 'fit-content', alignItems: 'center', paddingTop: '20px', backgroundColor: ' #eaecf1', border: '1px solid #e1e3e8 ', boxShadow: '0 0 7px #888888', borderRadius: '5px', padding: '50px' }}>
              <Card.Title style={{ color: 'black', fontWeight: 'bold', fontSize: '18px', textAlign: 'center', fontSize: '30px' }}>{blog.body}</Card.Title>
            </Card.Body>
          </Then>
          <Else>
            <Row className='flexCol' style={{ marginTop: '40px', justifyContent: 'center' }}>
              <Editor
                apiKey='vbaon8jny71c8uc0ebn1nn45htchbunbi6b9wp9v3e072trm'
                initialValue={blog.body}
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

              <Button onClick={() => handleSubmit()} variant='outline-dark' className='buttonTopic' size='lg' type='submit' style={{ marginTop: '20px', height: '40px', fontWeight: '500', backgroundColor: 'blue', color: 'white', fontSize: '25px' }}>
                Submit
              </Button>
            </Row>
          </Else>
        </If>
        <Row>
          <If condition={context.user.username && (context.user.username == blog.author || context.user.role == 'admin')}>
            <Then>
              <Button style={{ backgroundColor: 'blue', fontSize: '25px', color: 'white', padding: '15px', position: 'absolute', left: '1000px', bottom: '50%' }} onClick={() => handleEdit()}>
                Edit
              </Button>
            </Then>
          </If>
        </Row>
        <Comments />
      </Container>
    </>
  );
}
