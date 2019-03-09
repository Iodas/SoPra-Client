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

const Label = styled.label`
  color: white;
  text-transform: capitalize;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null
        };
    }



    render() {
        return (
            <Container>
                <h2>Profile </h2>
                <PlayerContainer>
                    <Users>
                        <Label>username: </Label>{this.props.user.username}
                    </Users>
                </PlayerContainer>
                <ButtonContainer>
                    <Button
                        width="50%"
                        onClick={() => {
                            this.props.history.push('/game');
                        }}
                    >
                        back
                    </Button>
                </ButtonContainer>
            </Container>

        );
    }
}

export default withRouter(Profile);