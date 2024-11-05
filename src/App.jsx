import "./App.css";
import Button from "./components/Button/Button";
import JournalItem from "./components/JournalItem/JournalItem";
import CardButton from "./components/CardButton/CardButton";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalList from "./components/JournalList/JournalList";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";
import Header from "./components/Header/Header";
import JournalForm from "./components/JournalForm/JournalForm";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextProvider } from "./context/user.context.jsx";

function App() {
  // const data = [
  //   // {
  //   //   id: 1,
  //   //   title: "Подготовка к обновлению курсов",
  //   //   date: new Date(),
  //   //   text: "Сегодня провёл весь день за...",
  //   // },
  //   // {
  //   //   id: 2,
  //   //   title: "Поход в годы",
  //   //   date: new Date(),
  //   //   text: "Думал, что очень много време...",
  //   // },
  //   // {
  //   //   id: 3,
  //   //   title: "Первая заметка",
  //   //   date: new Date(),
  //   //   text: "Создал первую заметку, чтобы ...",
  //   // },
  // ];

  const rendJournal = (el) => {
    if (userId === userId) {
      return (
        <CardButton key={el.id}>
          <JournalItem title={el.title} text={el.text} date={el.date} />
        </CardButton>
      );
    }
  };

  const [data, setData] = useState([]);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("data"));
    if (items) {
      setData(
        items.map((item) => ({
          ...item,
          date: new Date(item.date),
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (data.length) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  const addItem = (e) => {
    setData((oldData) => [
      ...oldData,
      {
        title: e.title,
        text: e.text,
        date: new Date(e.date),
        tag: e.tag,
        userId: e.userId,
        id: oldData.length > 0 ? Math.max(...oldData.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };
  const sortItems = (a, b) => {
    return a.date < b.date ? 1 : -1;
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalList>
            <JournalAddButton />

            {data.length === 0 ? (
              <p>Записей пока нет, добавьте первую</p>
            ) : (
              data.sort(sortItems).map(rendJournal)
            )}
          </JournalList>
        </LeftPanel>
        <Body>
          <JournalForm clicked={addItem} />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
