//import logo from './logo.svg';
import {Component} from 'react'
import './App.css';
import contacts from "./contacts.json";

class App extends Component {
  // need first five contacts only
  state = {
    contacts : contacts.splice(0, 5)
   }
 //Add contacts
  handleAdd = () => {
  let randomIndex =Math.floor(Math.random()* contacts.length)
  let randomContacts = contacts[randomIndex]

  this.setState({
    contacts:[...this.state.contacts , randomContacts]
  })
}

 //sort by name 

 handleSortName = () => {
  
  //always clone the arr mutating
  let clonedContacts = JSON.parse(JSON.stringify(this.state.contacts))
  clonedContacts.sort((first , second) => {
      if(first.name > second.name){
          return 1
      } 
      else if(first.name < second.name){
          return -1
      }
      else {
          return 0
      }
  })
  //always update the state
  this.setState({
      contacts: clonedContacts
  })
}
// sort by popularity

handleSortPopularity = () => {
  
  //always clone the arr mutating
  let clonedContacts = JSON.parse(JSON.stringify(this.state.contacts))
  clonedContacts.sort((first , second) => {
      if(first.popularity < second.popularity){
          return 1
      } 
      else if(first.popularity > second.popularity){
          return -1
      }
      else {
          return 0
      }
  })
  //always update the state
  this.setState({
    contacts: clonedContacts
  })
}

//Remov contacts

handleDelete = (contactId) => {
  console.log('Delete')
  let filteredContacts = this.state.contacts.filter((singleContacts) => {
      return singleContacts.id !== contactId
  })
   this.setState ({
       contacts: filteredContacts
   })
}

   render(){
   return (
   <div>
      <div >
        <h1>IronContacts</h1>
        <button onClick={this.handleAdd}>Add Random Contact</button>
        <button onClick={this.handleSortName}>Sort By Name</button>
        <button onClick={this.handleSortPopularity}>sort By Popularity</button>

          {this.state.contacts.map((singleContacts , index) => {
          return (
            
        <table>
        <thead>
            <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
             </thead>
          <thead>
            <tr>
            <td><img src={singleContacts.pictureUrl} alt="" height="100px"/></td>
            <td>{singleContacts.name}</td>
           <td> {singleContacts.popularity}</td>
           <td>{index}</td>
           <td><button onClick={() => {this.handleDelete(singleContacts.id)}}>Delete</button></td>
            </tr>
          </thead>
        </table>
          )
        })}
      </div>
   </div>
  );
}
}

export default App;
