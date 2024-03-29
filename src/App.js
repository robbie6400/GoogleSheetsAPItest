import React, { Component, useEffect, useState } from 'react';
import { Button, Form, Table, Header } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [hobby, setHobby] = useState('');
  const [APIdata, setAPIdata] = useState([]);
  const [refresh, setRefresh] = useState([]);

  {/*
  
  Use sheet.best to get axios link
  View Google sheet here: https://docs.google.com/spreadsheets/d/1HIKnvFkx-uEfazE-Nmxf9mB8sLcXvhpJ0nPUKUzA7JU/edit?usp=sharing

  */}
  const onSubmit = () => {
    axios.post('https://sheet.best/api/sheets/6298a724-93d8-43ca-8884-a07f7a16d7b6',{
      name, age, salary, hobby
    })
    .then((data) => {
      setRefresh(data);
      setName('');
      setAge('');
      setSalary('');
      setHobby('');
    })
  }

  useEffect(() => {
    axios.get('https://sheet.best/api/sheets/6298a724-93d8-43ca-8884-a07f7a16d7b6')
    .then((incomingData) => {
      setAPIdata(incomingData.data)
    })  
  }, [refresh])
    
return (
  <>
      <Header as='h2'>React Google Sheets Test Form </Header>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input placeholder='Name' onChange = {(e) => setName(e.target.value)}/>
          </Form.Field>
          <Form.Field>
            <label>Age</label>
            <input placeholder='Age' onChange = {(e) => setAge(e.target.value)}/>
          </Form.Field>
          <Form.Field>
            <label>Salary</label>
            <input placeholder='Salary' onChange = {(e) => setSalary(e.target.value)}/>
          </Form.Field>
          <Form.Field>
            <label>Hobby</label>
            <input placeholder='Hobby' onChange = {(e) => setHobby(e.target.value)}/>
          </Form.Field>
          
          <Button color="blue" type='submit' onClick={onSubmit}>Submit</Button>
        </Form>
		
		<Table fixed style={{padding: 20}}>
			<Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Age</Table.HeaderCell>
          <Table.HeaderCell>Salary</Table.HeaderCell>
          <Table.HeaderCell>Hobbies</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

			<Table.Body>
        {APIdata.map((data) => {
          return (
          <Table.Row>
            <Table.Cell>{data.name}</Table.Cell>
            <Table.Cell>{data.age}</Table.Cell>
            <Table.Cell>{data.salary}</Table.Cell>
            <Table.Cell>{data.hobby}</Table.Cell>
          </Table.Row>
          )
        })}
      </Table.Body>
		</Table>
  </>
  )
}
		
