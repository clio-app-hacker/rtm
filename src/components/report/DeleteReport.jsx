import React, {
    Component,
} from 'react';
import { Redirect } from "@reach/router";
import { DBService } from "../../services/dbService";

class DeleteReport extends Component {

    constructor(props) {
        super(props);
        this.state = { id: props.id };
    }

    async deleteData() {
        console.log("deleteData", this.state.id);
        this.setState({ isDeleted: false });
        const result = await DBService.delete(`/rtm/reports/${this.state.id}`);
        return result;
    }

    async componentDidMount() {
        this.deleteData().then(() => {
            this.setState({ isDeleted: true });
        });
    }
    render() {
        if (this.state.isDeleted) {
            return <Redirect noThrow to="/reports" />
        } else {
            return <div>Deleting...</div>
        }
    }
}


export default DeleteReport;
