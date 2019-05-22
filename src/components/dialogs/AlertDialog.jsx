import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {


    render() {

        const { title, description, onConfirm, onCancel } = this.props;
        return (
            <Dialog
                open={true}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AlertDialog;
