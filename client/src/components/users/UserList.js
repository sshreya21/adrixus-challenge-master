import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import axios from "axios";
// import {
//   StyleUserWrapper,
//   // StyledHeader,
//   // StyledSearchBar,
//   // StyledSort,
//   // StyledTable,
//   // StyledPagination,
// } from "./user.styled";
import "../../App.css";

const Button = ({ title, handleOnClick }) => {
  return (
    <button
      style={{
        borderRadius: "3px",
        margin: "20px 5px",
      }}
      className="btn btn-small waves-effect waves-light hoverable blue accent-3"
      onClick={handleOnClick}
    >
      {title}
    </button>
  );
};

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      users: [],
      filteredUsers: null,
      totalPages: 0,
      query: "",
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  async fetchUsers(page = 1) {
    this.setState((state) => {
      return { isLoading: true };
    });
    const response = await axios.get(
      `https://reqres.in/api/users?per_page=3&page=${page}`
    );
    const apiUsers = response.data.data;
    this.setState((state) => {
      return {
        users: apiUsers,
        isLoading: false,
        totalPages: response.data.total_pages,
      };
    });
  }

  sortUsers(key) {
    this.setState((state) => {
      return {
        users: state.users.sort(function (a, b) {
          if (a[key] < b[key]) {
            return -1;
          }
          if (a[key] > b[key]) {
            return 1;
          }
          return 0;
        }),
      };
    });
  }

  async filterUsers(key, query) {
    this.setState((state) => {
      return {
        filteredUsers: !query
          ? state.users
          : state.users.filter((user) =>
              user[key].toLowerCase().includes(query.toLowerCase())
            ),
      };
    });
  }

  onPaginationButtonClick(page) {
    this.fetchUsers(page);
  }

  renderPaginationButtons() {
    const buttons = [];
    for (let index = 1; index <= this.state.totalPages; index++) {
      buttons.push(
        <Button
          key={index}
          title={index}
          handleOnClick={() => this.onPaginationButtonClick(index)}
        />
      );
    }
    return <div>{buttons}</div>;
  }

  onChange(e) {
    this.filterUsers("first_name", e.target.value);
  }

  renderSearch() {
    return (
      <input
        onChange={(e) => this.onChange(e)}
        id="query"
        type="text"
        placeholder="Search"
        size="50"
        margin="20"
      />
    );
  }

  onSortButtonClick(e) {
    this.sortUsers("first_name");
  }

  renderSort() {
    return (
      <div
        className="right"
        style={{
          margin: "0 20px",
        }}
      >
        <Button title="SORT" handleOnClick={(e) => this.onSortButtonClick(e)} />
      </div>
    );
  }

  renderUserList() {
    if (this.state.isLoading) return <p>Loading...</p>;
    const users = this.state.filteredUsers || this.state.users;

    return (
      <div className="container">
        <h4 className="flow-text grey-text text-darken-3">
          <b>User List</b>
        </h4>

        <div className="center">
          <div className="left"> {this.renderSearch()}</div>
          <div className="right">{this.renderSort()}</div>
        </div>

        <table className="highlight centered responsive-table">
          <thead>
            <tr>
              <th className=" grey-text text-darken-3">First Name</th>
              <th className=" grey-text text-darken-3">Last Name</th>
              <th className=" grey-text text-darken-3">Email Address</th>
            </tr>
          </thead>
          {users.map((user) => (
            <tbody key={user.id}>
              <tr>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          ))}
        </table>

        <div className="center-align">{this.renderPaginationButtons()}</div>
      </div>
    );
  }

  render() {
    const token = localStorage.getItem("token");
    if (!token)
      return <Redirect to="/login"></Redirect>
    return this.renderUserList();
  }
}
export default UserList;
