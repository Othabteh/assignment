import React, { useState, useEffect, useContext } from 'react';
import superagent from 'superagent';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const blogsApi = 'https://osamapwc.herokuapp.com/posts';

export default function HomePage() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    async function getData() {
      await superagent.get(blogsApi).then((data) => {
        setResults([...data.body]);
      });
    }
    getData();
  }, []);
  return (
    <Container style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '100px' }}>
      {results.map((item) => {
        return (
          <Card style={{ magin: '50px' }}>
            <NavLink to={() => `/posts/${item._id}&creatorID=${item.userID}`}>
              <Card.Body style={{ margin: '0 auto', width: '18rem', height: '150px', alignItems: 'center', paddingTop: '20px', backgroundColor: ' #eaecf1', border: '1px solid #e1e3e8 ', boxShadow: '0 0 7px #888888', borderRadius: '5px' }}>
                <Card.Title style={{ color: 'Blue', fontWeight: 'bold', fontSize: '18px', textAlign: 'center', fontSize: '30px', lineHeight: '150px' }}>{item.title}</Card.Title>
              </Card.Body>
            </NavLink>
          </Card>
        );
      })}
    </Container>
  );
}
