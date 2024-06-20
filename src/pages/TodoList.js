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

const TodoList = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todo"), orderBy("created", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todoData = [];
      const doneTodoData = [];
      snapshot.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        if (data.checked) {
          doneTodoData.push(data);
        } else {
          todoData.push(data);
        }
      });
      setTodos(todoData);
      setDoneTodos(doneTodoData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async () => {
    if (task.trim()) {
      await addDoc(collection(db, "todo"), {
        task: task.trim(),
        created: serverTimestamp(),
        checked: false,
      });
      setTask("");
    }
  };

  const handleCheck = async (id, checked) => {
    const todoDoc = doc(db, "todo", id);
    await updateDoc(todoDoc, { checked });
  };

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
