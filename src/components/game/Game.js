import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import User from "../shared/models/User";
import Profile from "./Profile";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null,
      profile: null
    };
  }

  logout() {
    var myToken = localStorage.getItem("token");
    var id = localStorage.getItem("id");
    fetch(`${getDomain()}/users/` + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: myToken,
        status: "OFFLINE"
      })
    })
        .then(response => {
          if (response.status === 204){
            localStorage.removeItem("token");
            this.props.history.push('/game')
          }
          else if (response.status === 401)  {
            alert("You are not authorized to do that!");
          }
        })
        .catch(err => {
          console.log(err);
          alert("Something went wrong: " + err);
        });
    /*localStorage.removeItem("token");
    //this.state.status = "OFFLINE";
    this.props.history.push("/login");*/
  }

  componentDidMount() {
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(async users => {
        // delays continuous execution of an async operation for 0.8 seconds.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 800));

        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });

  }


  /*goToProfile(user){
    this.setState({user});
    this.probs.history.push('/login');
  }*/

  render() {
    if(this.state.profile !== null){
      return <Profile user={this.state.profile}/>;
    }
    return (
      <Container>
        <h2>Happy Coding! </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.id} onClick={() => {this.setState({profile: user}); }}>
                    <Player user={user} />
                  </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
