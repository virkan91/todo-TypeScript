import { useRef, useState } from "react";

import "./App.css";

interface Todo {
  id: number;
  title: string;
  complete: boolean;
  edited: boolean;
}

function App() {
  const [data, setData] = useState<Todo[]>([
    {
      id: 1,
      title: "Virkan",
      complete: false,
      edited: false,
    },
    {
      id: 2,
      title: "Shirinov",
      complete: false,
      edited: false,
    },
  ]);

  // sets
  const [text, setText] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [textEdit, setTextEdit] = useState<string>("");
  const [idx, setIdx] = useState<number>(0);

  const [editedText, setEditedText] = useState<string>("");

  // Delete
  const deleteData = (id: number) => {
    let newData = data.filter((elem) => {
      return elem.id != id;
    });
    setData(newData);
  };

  // Edit
  const editData = (event: any) => {
    event.preventDefault();
    if (textEdit.trim().length != 0) {
      let newObj = data.map((elem) => {
        if (idx == elem.id) {
          elem.title = textEdit;
          if(editedText != textEdit ) elem.edited = true
          
        }
        return elem;
      });
      setData(newObj);
      setModal(false);
      
    }
  };
  // windiw modal
  const onCloseModal = useRef();
  return (
    <>
      <form
        action="#"
        onSubmit={() => {
          if (text.trim().length != 0) {
            const newData = {
              id: Date.now(),
              title: text,
              complete: false,
              edited: false,
            };
            setData([...data, newData]);
            setText("");
          }
        }}
        className="flex gap-4 p-[10px] bg-slate-500 pl-[82px]"
      >
        <input
          required
          onChange={(event) => setText(event.target.value)}
          value={text}
          type="text"
          placeholder="Name:"
          className="border rounded-[8px] outline-none pl-[20px]"
        />

        <button className="bg-[#ccc] p-[10px] rounded-md text-[green] font-extrabold">
          Add
        </button>
      </form>
      <div className="grid grid-cols-4 py-[30px] gap-4 text-center justify-around max-w-[1200px] m-auto ">
        {data.map((elem) => {
          return (
            <div className="bg-slate-500 rounded-md drop-shadow-xl">
              <div className="h-[90px]">
                <h1
                  style={{
                    color: elem.complete ? "red" : "white",
                    textDecoration: elem.complete ? "line-through" : "none",
                  }}
                  className="text-[20px] text-[#FFFFFF] p-3"
                >
                  {elem.title}
                </h1>
                {elem.edited ? <p className="text-white">Отредактировано</p> : null}
              </div>
              <div className="bg-white py-[10px] flex justify-around">
                <button
                  onClick={() => deleteData(elem.id)}
                  className="bg-red-900 text-[#FFF] p-[2px_8px] rounded-md"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    setModal(true);
                    setTextEdit(elem.title);
                    setIdx(elem.id);
                    setEditedText(elem.title);

                  }}
                  className="bg-lime-800 text-[#FFF] p-[2px_8px] rounded-md"
                >
                  Edit
                </button>
                <input
                  type="checkbox"
                  checked={elem.complete}
                  onClick={() => {
                    const newData = data.map((el) => {
                      if (el.id == elem.id) {
                        el.complete = !el.complete;
                      }
                      return el;
                    });
                    setData(newData);
                  }}
                />
              </div>
            </div>
          );
        })}
        {modal ? (
          <div
            ref={onCloseModal}
            onClick={(event) => {
              if (event.target == onCloseModal.current) setModal(false);
            }}
            className="w-full h-screen flex justify-center items-center bg-[#ccc]/50 absolute top-0 left-0"
          >
            <form
              action=""
              onSubmit={(event) => editData(event)}
              className="bg-slate-500 px-[14px] pb-[20px] rounded-lg text-white"
            >
              <div className="flex justify-end pb-[20px] pt-[10px]">
                <button onClick={() => setModal(false)}>X</button>
              </div>
              <input
                onChange={(event) => setTextEdit(event.target.value)}
                required
                value={textEdit}
                type="text"
                className="text-[#000] outline-none p-2 rounded-md"
              />
              <div className="flex justify-around mt-[20px]">
                <button
                  type="submit"
                  className="bg-lime-800 text-[#FFF] p-[2px_8px] rounded-md"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
