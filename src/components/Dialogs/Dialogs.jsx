import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import DialogAddMessageForm from "../form/DialogAddMessageForm";


const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogElements = state.dialogs.map((d) => <DialogItem name={d.name} key={d.id} id={d.id}/>);

    let messagesElements = state.messages.map((m) => <Message message={m.message} key={m.id}/>);

    if (props.isAuth == false) return <Navigate to={'/login'}/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <DialogAddMessageForm sendMessage={props.sendMessage} />
            </div>
        </div>
    )
}

export default Dialogs