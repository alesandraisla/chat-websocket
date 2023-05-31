// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import io from "socket.io-client";
import style from "./Join.module.css";
import { Input, Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function Join({ setChatVisibility, setSocket }) {
  const usernameRef = useRef();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;
    const socket = await io.connect("http://localhost:3001");
    socket.emit("set_username", username);
    setSocket(socket);
    setChatVisibility(true);
  };

  return (
    <div className={style["join-container"]}>
      <h2>Chat em tempo real</h2>
      <Input
        className={style["input-style"]}
        inputRef={usernameRef}
        placeholder="Nome de usuário"
      />
      <Button
        className={style["btn-style"]}
        sx={{ mt: 2 }}
        onClick={() => handleSubmit()}
        variant="contained"
      >
        Entrar
      </Button>
    </div>
  );
}
