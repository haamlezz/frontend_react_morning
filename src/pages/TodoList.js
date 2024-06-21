import React, { useState, useEffect } from "react";
import { Input, List, Checkbox, Typography, Space } from "antd";
import { db } from "../firebaseconfig"; // Ensure the path is correct
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const { Text } = Typography;

//ປະກາດ TodoList compoment
const TodoList = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  useEffect(() => {
    //ຂະບວນການດຶງຂໍ້ມູນມາເກັບໄວ້ໃນ todos ແລະ doneTodos

    //ຄິວຣີ້ຂໍ້ມູນຈາກຈາກ todo colecction ລຽງຕາມວັນທີທີ່ສ້າງ
    const q = query(collection(db, "todo"), orderBy("created", "desc"));

    //ດຶງຂໍ້ມູນທັງໝົດມາໄວ້ໃນຮູບແບບຂອງ array
    const unsubscribe = onSnapshot(q, (snapshot) => {
      //ອາເຣລາຍການ todo
      const todoData = [];

      //ອາເຣລາຍການ doneTodo
      const doneTodoData = [];

      //Loop ຂໍ້ມູນຈາກ snapshot
      snapshot.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };

        //ກໍລະນີ checked ມີຄ່າເປັນ true ໃຫ້ເພີ່ມເຂົ້າໃນ doneTodo
        if (data.checked) {
          doneTodoData.push(data);
        } else {
          //ກໍລະນີເປັນ false ໃຫ້ເພີ່່ມເຂົ້າໃນ todo
          todoData.push(data);
        }
      });

      //setState ຂອງທັງ todos ແລະ doneTodos
      setTodos(todoData);
      setDoneTodos(doneTodoData);
    });

    //ທຳການສົ່ງຄ່າກັບເພື່ອໃຊ້ງານ
    return () => unsubscribe();
  }, []);

  //ຟັງຊັ້ນສຳລັບເພີ່ມຂໍ້ມູນ
  const handleAddTask = async () => {
    //trim ເພື່ອລົບຍະວ່າງທີ່ບໍ່ຈຳເປັນອອກ
    if (task.trim()) {
      //ເພີ່ມເຂົ້າໃນ todo collection
      await addDoc(collection(db, "todo"), {
        task: task.trim(),
        created: serverTimestamp(),
        checked: false,
      });

      //ກຳນົດໃຫ້ເປັນຄ່າວ່າງ
      setTask("");
    }
  };

  //ຟັງຊັ້ນໝາຍຕິກຖືກ
  const handleCheck = async (id, checked) => {
    const todoDoc = doc(db, "todo", id);
    await updateDoc(todoDoc, { checked });
  };

  //ຟັງຊັ້ນ enter event
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Input
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div style={{ marginTop: "20px" }}>
        <Text strong>Todo</Text>
        <List
          dataSource={todos}
          renderItem={(item) => (
            <List.Item>
              <Space>
                <Checkbox
                  checked={item.checked}
                  onChange={() => handleCheck(item.id, !item.checked)}
                />
                <Text>{item.task}</Text>
              </Space>
            </List.Item>
          )}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Text strong>Done</Text>
        <List
          dataSource={doneTodos}
          renderItem={(item) => (
            <List.Item>
              <Space>
                <Checkbox
                  checked={item.checked}
                  onChange={() => handleCheck(item.id, !item.checked)}
                />
                <Text delete>{item.task}</Text>
              </Space>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default TodoList;
