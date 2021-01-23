import React, { useState, useEffect, useContext } from 'react';
// import './styles.scss';
import superagent from 'superagent';
// import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// import Image from 'react-bootstrap/Image';
// import Button from 'react-bootstrap/Button';
// import Results from '../search/jobs/results';
// import { useHistory } from 'react-router-dom';
// import { AuthContext } from '../../context/auth';
// import { If, Then, Else } from 'react-if';
const blogsApi = 'https://osamapwc.herokuapp.com/posts';

export default function HomePage() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    async function getData() {
      await superagent
        .get(blogsApi)

        .then((data) => {
          console.log(data);
          setResults([...data.body]);
        });
    }
    getData();
  }, []);
  return (
    <Container style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '100px' }}>
      {results.map((item) => {
        return (
          <NavLink to={() => `/posts/${item._id}&creatorID=${item.userID}`}>
            <Card.Body style={{ margin: '0 auto', width: '18rem', height: '150px', alignItems: 'center', paddingTop: '20px', backgroundColor: ' #eaecf1', border: '1px solid #e1e3e8 ', boxShadow: '0 0 7px #888888', borderRadius: '5px' }}>
              <Card.Body>
                <Card.Title style={{ color: 'black', fontWeight: 'bold', fontSize: '18px', textAlign: 'center', fontSize: '30px' }}>{item.title}</Card.Title>
              </Card.Body>
            </Card.Body>
          </NavLink>
        );
      })}
    </Container>
  );
}
