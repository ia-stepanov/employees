import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Билл Гейтс', salary: 800, increase: false, rise: true, id: 1 },
        { name: 'Марк Цукерберг', salary: 3000, increase: true, rise: false, id: 2 },
        { name: 'Илон Маск', salary: 5000, increase: false, rise: false, id: 3 },
      ],
    };
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((elem) => elem.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = { name, salary, increase: false, rise: true, id: this.maxId++ };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;

    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />
        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList
          onDelete={this.deleteItem}
          data={this.state.data}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
