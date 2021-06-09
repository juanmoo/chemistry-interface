import React from "react";
import { Redirect } from "react-router-dom"


export class Home extends React.Component {

    renderRedirect = () => {
        return <Redirect to='/extract' />
    }

    render() {

        return (
            <>
                {this.renderRedirect()}
            </>
        );
    }
}