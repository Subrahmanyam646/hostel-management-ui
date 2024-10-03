import logo from './logo.svg';
import './App.css';
import Calculator from './Calculator';
import AddJoineeForm from './HotelManagementScreens/Addjoineeform';
import JoineeDetails from './HotelManagementScreens/Joineedetails';
import PersonList from './HotelManagementScreens/Personwithoutroom';
import axios from 'axios';

function App() {

  return (
    <div>
      <h1>Add New Joinee</h1>
      <PersonList />
      {/* <h1>Hostel Management System</h1>
      <JoineeDetails /> */}
    </div>
  );
}

export default App;
