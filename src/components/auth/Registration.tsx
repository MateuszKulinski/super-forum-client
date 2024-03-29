import React, { FC, useReducer, useState } from "react";
import ReactModal from "react-modal";
import "./Registration.css";
import ModalProps from "../types/ModalProps";
import userReducer from "./common/UserReducer";
import { allowSubmit } from "./common/Helpers";
import PasswordComparison from "./PasswordComparison";

const Registration: FC<ModalProps> = ({ isOpen, onClickToggle }) => {
    const [
        {
            userName,
            password,
            email,
            passwordConfirm,
            resultMsg,
            isSubmitDisabled,
        },
        dispatch,
    ] = useReducer(userReducer, {
        userName: "Test",
        password: "",
        passwordConfirm: "",
        email: "admin@dzhaven.com",
        resultMsg: "",
        isSubmitDisabled: true,
    });

    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "userName" });
        if (!e.target.value)
            allowSubmit(dispatch, "Nazwa użytkownika nie może być pusta", true);
        else allowSubmit(dispatch, "", false);
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ payload: e.target.value, type: "email" });
        if (!e.target.value) {
            allowSubmit(dispatch, "E-mail nie może być pusty.", true);
        } else {
            allowSubmit(dispatch, "", false);
        }
    };

    const onClickRegister = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        onClickToggle(e);
    };

    const onClickCancel = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        onClickToggle(e);
    };

    return (
        <ReactModal
            className="modal-menu"
            isOpen={isOpen}
            onRequestClose={onClickToggle}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
        >
            <form>
                <div className="reg-inputs">
                    <div>
                        <label>Nazwa użytkownika</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={onChangeUserName}
                        />
                    </div>
                    <div>
                        <label>E-mail</label>
                        <input
                            type="text"
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </div>
                    <PasswordComparison
                        dispatch={dispatch}
                        password={password}
                        passwordConfirm={passwordConfirm}
                    />
                    <div className="form-buttons">
                        <div className="form-btn-left">
                            <button
                                style={{ marginLeft: ".5em" }}
                                className="action-btn"
                                disabled={isSubmitDisabled}
                                onClick={onClickRegister}
                            >
                                Rejestruj
                            </button>
                            <button
                                style={{ marginLeft: ".5em" }}
                                className="cancel-btn"
                                onClick={onClickCancel}
                            >
                                Zamknij
                            </button>
                        </div>
                        <span className="form-btn-right">
                            <strong>{resultMsg}</strong>
                        </span>
                    </div>
                </div>
            </form>
        </ReactModal>
    );
};

export default Registration;
