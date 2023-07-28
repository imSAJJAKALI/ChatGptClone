import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [selectModel, setSelectmodel] = useState(null);
  const [model, setModel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handelSumbit = async (e) => {
    e.preventDefault();
    if (!input || isLoading) {
      return; // Ignore empty input or if a request is already in progress
    }

    const chatLog = [...chats, { user: "me", chat: input }];
    setChats(chatLog);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/", {
        chats: chatLog.map((chat) => chat.chat).join(" "),
        model: selectModel,
      });

      setChats((chats) => [...chats, { user: "gpt", chat: response.data.chat }]);
    } catch (error) {
      console.error("Error while making API request:", error);
      // Handle the error, maybe show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const onPressEnter = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      handelSumbit(e);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/");
        console.log("API Response:", response.data);
        setModel(response.data.model);
        setSelectmodel(response.data.model[0].id);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    getUsers();
  }, []);

  const handelModel = (e) => {
    setSelectmodel(e.target.value);
  };

  return (
    <div className="App">
      <aside className="left-panel">
        <button className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          New Chat
        </button>
        <div>
          <select
            value={selectModel}
            onChange={handelModel}
            className="btn selectModel"
          >
            {model &&
              model.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.id}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <section className="main">
        <div className="main_chat">
          {chats.map((chat) =>
            chat.user === "me" ? (
              <div className="me" key={chat.chat}>
                <div className="chat">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <div>{chat.chat}</div>
                </div>
              </div>
            ) : (
              <div className="gpt" key={chat.chat}>
                <div className="chat">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                    />
                  </svg>
                  <div>{chat.chat}</div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="chatBox">
          <form onSubmit={handelSumbit}>
            <textarea
              type="text"
              value={input}
              className="inField"
              onChange={(e) => setInput(e.target.value)}
              rows="1"
              onKeyDown={onPressEnter}
              disabled={isLoading} // Disable the input during API request
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
