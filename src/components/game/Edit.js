import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import * as React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import User from "../shared/models/User";


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

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;


class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUsername: null,
            newBirthday: null
        };
    }



    goBackToGame(){
        this.props.history.push('/game');
    }

    updateUser(){
        var myToken = localStorage.getItem("token");
        fetch(`${getDomain()}/users/` + this.props.user.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: myToken,
                username: this.state.newUsername,
                birthday: this.state.newBirthday
            })
        })
            .then(response => {
                if (response.status === 204){
                    this.props.history.push('/profile')
                }
                else if (response.status === 401)  {
                    alert("oh no wrong token!" + myToken);
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong: " + err);
            });
    }

    handleInputChange(key, value){
        this.setState({ [key]: value});
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <h2>Edit your profile</h2>
                    <Form>
                        <Label>Select new Username</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange("newUsername", e.target.value);
                            }}
                        />
                        <Label>Select new Birthday</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange("newBirthday", e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                disabled={!(this.state.newUsername || this.state.newBirthday)}
                                width="100%"
                                onClick={() => {
                                    this.updateUser();
                                }}
                            >
                                Save Changes
                            </Button>
                            <Button
                                //disabled={!this.state.username || !this.state.name}
                                width="100%"
                                onClick={() => {
                                    this.goBackToGame();
                                }}
                            >
                                Back to Game
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(Edit);