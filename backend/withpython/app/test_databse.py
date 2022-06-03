import unittest

from database import DataBase, ModelUser, ModelTodo


class TestUser(unittest.TestCase):
    model = ModelUser(name="Rizal Achmad", password="123123123")
    db = DataBase()
    db.add_user(model)
    db.commit_db()

    todo = ModelTodo(todo_id=1, list_id=1, title="todos", body="inibody")

    def test_get_user(self):
        datas = self.db.get_users()
        self.assertEqual(datas.users[0].name, self.model.name)

    def test_update_todo(self):
        self.db.get_todos(self.todo.list_id)
        self.db.update_todos_status(True, 1, 1)
        self.db.commit_db()
        data = self.db.get_todos(self.todo.list_id)
        self.assertTrue(data.todos[0].done is True)

    def test_add_todo(self):
        self.db.add_todos(self.todo)
        self.db.commit_db()
        data = self.db.get_todos(self.todo.list_id)
        self.assertEqual(data.todos[0].title, self.todo.title)

    def test_delete_todo(self):
        self.db.delete_todo(1, 1)
        self.db.commit_db()
        data = self.db.get_todos(1)
        self.assertFalse(any(data.todos))


if __name__ == "__main__":
    unittest.main()
