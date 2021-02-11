import React from "react";
import { Redirect } from "react-router-dom"


export class Home extends React.Component {

    renderRedirect = () => {
        return <Redirect to='/upload' />
    }

    render() {

        return (
            <>
                <h1>Takeda Project </h1>
                {this.renderRedirect()}
            </>
        );
    }
}