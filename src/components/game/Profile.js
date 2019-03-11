import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import * as React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import Edit from "./Edit";


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
            edit: false
        };
    }



    render() {
        if (this.state.edit === true){
            return <Edit user={this.props.user}/>
        }
        return (
            <Container>
                <h2>Profile </h2>
                <PlayerContainer>
                    <Users>
                        <Label>username: </Label>{this.props.user.username}
                    </Users>
                    <Users>
                        <Label>status: </Label>{this.props.user.status}
                    </Users>
                    <Users>
                        <Label>creation date: </Label>{this.props.user.date}
                    </Users>
                    <Users>
                        <Label>birthday: </Label>{this.props.user.birthday}
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
                    <Button
                        width="50%"
                        onClick={() => {
                            this.setState({edit: true});
                        }}
                    >
                        Edit Profile
                    </Button>
                </ButtonContainer>
            </Container>

        );
    }
}

export default withRouter(Profile);