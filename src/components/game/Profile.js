import {Spinner} from "../../views/design/Spinner";
import Player from "./Game";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import * as React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";


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




class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }



    render() {
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
                                    <PlayerContainer key={user.id}>
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

export default withRouter(Profile);