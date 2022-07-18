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
  const [refresh, setRefresh] = useState('');

  {/*Use sheet.best to get axios link*/}
  const onSubmit = () => {
    axios.post('https://sheet.best/api/sheets/5e54aab8-aa20-4efe-b2b5-3825cfcdbacd',{
      name, age, salary, hobby
    })
  }

  useEffect(() => {
    axios.get('https://sheet.best/api/sheets/5e54aab8-aa20-4efe-b2b5-3825cfcdbacd')
    .then((incomingData) => {
      setAPIdata(incomingData.data)
    })  
  }, [])
    
return (
  <>
      <Header as='h2'>React Google Sheets Test Form Thing </Header>
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
		