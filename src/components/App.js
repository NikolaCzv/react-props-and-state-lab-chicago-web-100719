import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }


  onChangeType = ({ target: { value } }) => {
    this.setState({ filters: { ...this.state.filters, type: value } });
  };

  onFindPetsClick = () => {
    if(this.state.filters.type === 'all') {
      fetch('/api/pets')
      .then(resp => resp.json())
      .then(pets => this.setState({pets: pets}))
    } else if (this.state.filters.type === 'cat'){
      fetch(`/api/pets?type=cat`)
      .then(resp => resp.json())
      .then(cats => this.setState({pets: cats}))
    } else if (this.state.filters.type === 'dog'){
      fetch(`/api/pets?type=dog`)
      .then(resp => resp.json())
      .then(dogs => this.setState({pets: dogs}))
    } else if (this.state.filters.type === 'micropig'){
      fetch(`/api/pets?type=micropig`)
      .then(resp => resp.json())
      .then(micropigs => this.setState({pets: micropigs}))
    }
  }

  onAdoptPet = petId => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets: pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser
              pets={this.state.pets}
              onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
